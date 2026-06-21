import jwt
import requests
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import User

class ClerkAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return None

        token = auth_header.split(" ")[1]
        
        # We need the JWKS URL to verify the signature
        # Derive from VITE_CLERK_PUBLISHABLE_KEY or CLERK_FRONTEND_API
        # We will hardcode the fetch for now using the known URL
        # For a prod app, we'd cache this JWKS response
        
        jwks_url = "https://growing-porpoise-11.clerk.accounts.dev/.well-known/jwks.json"
        
        try:
            jwks_client = jwt.PyJWKClient(jwks_url)
            signing_key = jwks_client.get_signing_key_from_jwt(token)
            
            data = jwt.decode(
                token,
                signing_key.key,
                algorithms=["RS256"],
                # Clerk doesn't strictly require audience check if we don't set it, but we can verify it if needed.
                options={"verify_aud": False} 
            )
            
            clerk_user_id = data.get("sub")
            if not clerk_user_id:
                raise AuthenticationFailed("Invalid token payload")
                
            # Get or create the user
            user, created = User.objects.get_or_create(
                username=clerk_user_id,
                defaults={"role": "retailer"} # default role, could be pulled from clerk public metadata later
            )
            
            return (user, token)
            
        except jwt.PyJWKClientError as e:
            raise AuthenticationFailed(f"Unable to fetch JWKS: {e}")
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token has expired")
        except jwt.InvalidTokenError as e:
            raise AuthenticationFailed(f"Invalid token: {e}")
        except Exception as e:
            raise AuthenticationFailed(f"Authentication error: {e}")
