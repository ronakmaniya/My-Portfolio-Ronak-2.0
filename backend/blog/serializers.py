from rest_framework import serializers

from .models import Category, Post


class PostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("title", "slug", "created_at")


class PostDetailSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(read_only=True, slug_field="slug")

    class Meta:
        model = Post
        fields = ("title", "slug", "content", "created_at", "category")


class CategoryWithPostsSerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ("name", "slug", "posts")

    def get_posts(self, obj):
        posts = obj.posts.filter(is_published=True).order_by("-created_at")
        return PostListSerializer(posts, many=True).data
