from django.conf import settings
from rest_framework import generics, permissions
from rest_framework.renderers import BrowsableAPIRenderer, JSONRenderer

from .models import Project
from .serializers import ProjectSerializer


class ProjectListCreateView(generics.ListCreateAPIView):
	queryset = Project.objects.all()
	serializer_class = ProjectSerializer
	renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

	def get_renderers(self):
		if settings.DEBUG and self.request.user and self.request.user.is_staff:
			return super().get_renderers()
		return [JSONRenderer()]

	def get_permissions(self):
		if self.request.method == "POST":
			return [permissions.IsAdminUser()]
		return [permissions.AllowAny()]
