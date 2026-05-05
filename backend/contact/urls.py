from django.urls import path

from .views import ContactCreateView, ContactListView

urlpatterns = [
	path("", ContactCreateView.as_view(), name="contact-create"),
	path("submissions/", ContactListView.as_view(), name="contact-list"),
]
