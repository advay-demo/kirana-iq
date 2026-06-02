from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from .serializers import SignupSerializer, RetailerProfileSerializer
from .models import User, RetailerProfile


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


@api_view(["POST"])
def signup(request):
    serializer = SignupSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()

        tokens = get_tokens_for_user(user)

        return Response(
            {
                "message": "Account created successfully",
                "user": {
                    "id": user.id,
                    "name": user.first_name,
                    "username": user.username,
                    "role": user.role,
                    "phone": user.phone,
                    "has_onboarded": False,
                },
                "tokens": tokens,
            },
            status=status.HTTP_201_CREATED,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user:
        tokens = get_tokens_for_user(user)
        has_onboarded = hasattr(user, 'retailer_profile')

        return Response(
            {
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "name": user.first_name,
                    "username": user.username,
                    "role": user.role,
                    "has_onboarded": has_onboarded,
                },
                "tokens": tokens,
            }
        )

    return Response(
        {"error": "Invalid credentials"},
        status=status.HTTP_401_UNAUTHORIZED,
    )

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def onboard_retailer(request):
    if hasattr(request.user, 'retailer_profile'):
        return Response({"error": "Already onboarded"}, status=status.HTTP_400_BAD_REQUEST)

    serializer = RetailerProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)