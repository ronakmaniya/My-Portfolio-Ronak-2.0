from django import forms
from django.contrib import admin

from .models import Category, Post, unique_slugify


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
	list_display = ("name", "slug")
	prepopulated_fields = {"slug": ("name",)}
	search_fields = ("name",)


class PostAdminForm(forms.ModelForm):
	class Meta:
		model = Post
		fields = "__all__"

	def clean_slug(self):
		slug = self.cleaned_data.get("slug") or self.cleaned_data.get("title")
		return unique_slugify(Post, slug, self.instance.id)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
	form = PostAdminForm
	list_display = ("title", "category", "is_published", "created_at")
	list_filter = ("category", "is_published")
	search_fields = ("title", "content")
	prepopulated_fields = {"slug": ("title",)}
	date_hierarchy = "created_at"
