from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .serializers import RetailerProfileSerializer
from .models import User, RetailerProfile

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    has_onboarded = hasattr(user, 'retailer_profile')
    
    return Response({
        "user": {
            "id": user.id,
            "username": user.username,
            "role": user.role,
            "has_onboarded": has_onboarded,
        }
    })

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

@api_view(["GET", "PATCH"])
@permission_classes([IsAuthenticated])
def retailer_profile_view(request):
    try:
        profile = request.user.retailer_profile
    except RetailerProfile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = RetailerProfileSerializer(profile)
        return Response(serializer.data)
    
    elif request.method == "PATCH":
        serializer = RetailerProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)