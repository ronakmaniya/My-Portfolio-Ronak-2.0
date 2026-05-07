from django.conf import settings
from rest_framework import generics, permissions
from rest_framework.renderers import BrowsableAPIRenderer, JSONRenderer

from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactCreateView(generics.CreateAPIView):
	queryset = ContactMessage.objects.all()
	serializer_class = ContactMessageSerializer
	permission_classes = [permissions.AllowAny]
	renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

	def get_renderers(self):
		if settings.DEBUG and self.request.user and self.request.user.is_staff:
			return super().get_renderers()
		return [JSONRenderer()]


class ContactListView(generics.ListAPIView):
	queryset = ContactMessage.objects.all()
	serializer_class = ContactMessageSerializer
	permission_classes = [permissions.IsAdminUser]
	renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

	def get_renderers(self):
		if settings.DEBUG and self.request.user and self.request.user.is_staff:
			return super().get_renderers()
		return [JSONRenderer()]
