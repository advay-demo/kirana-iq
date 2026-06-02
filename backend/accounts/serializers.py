from rest_framework import serializers
from .models import User, RetailerProfile


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "password",
            "phone",
            "role",
            "first_name",
        ]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
            phone=validated_data.get("phone"),
            role=validated_data.get("role", "customer"),
            first_name=validated_data.get("first_name", ""),
        )
        return user


class RetailerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RetailerProfile
        fields = [
            "shop_name",
            "shop_category",
            "city",
            "latitude",
            "longitude",
            "whatsapp",
        ]