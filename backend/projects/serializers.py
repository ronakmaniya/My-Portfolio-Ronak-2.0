from rest_framework import serializers

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        if obj.image and getattr(obj.image, "url", None):
            return obj.image.url
        return ""

    class Meta:
        model = Project
        fields = (
            "title",
            "tag",
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
