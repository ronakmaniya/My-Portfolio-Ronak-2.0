from rest_framework import generics, permissions

from .models import Project
from .serializers import ProjectSerializer


class ProjectListCreateView(generics.ListCreateAPIView):
	queryset = Project.objects.all()
	serializer_class = ProjectSerializer

	def get_permissions(self):
		if self.request.method == "POST":
			return [permissions.IsAdminUser()]
		return [permissions.AllowAny()]
