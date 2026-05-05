from django.urls import path

from .views import PostDetailView, PostListByCategoryView

urlpatterns = [
	path("", PostListByCategoryView.as_view(), name="post-list"),
	path("<slug:slug>/", PostDetailView.as_view(), name="post-detail"),
]
