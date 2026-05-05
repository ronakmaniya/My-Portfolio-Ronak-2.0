from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Post
from .serializers import CategoryWithPostsSerializer, PostDetailSerializer


class PostListByCategoryView(APIView):
	def get(self, request):
		categories = Category.objects.prefetch_related("posts").all()
		serializer = CategoryWithPostsSerializer(categories, many=True)
		return Response({"categories": serializer.data})


class PostDetailView(generics.RetrieveAPIView):
	queryset = Post.objects.filter(is_published=True).select_related("category")
	serializer_class = PostDetailSerializer
	lookup_field = "slug"
