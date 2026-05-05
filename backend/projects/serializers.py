from rest_framework import serializers

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = (
            "title",
            "description",
            "tech_stack",
            "github_link",
            "live_link",
            "image_url",
            "featured",
            "display_order",
            "created_at",
        )
        read_only_fields = ("created_at",)
