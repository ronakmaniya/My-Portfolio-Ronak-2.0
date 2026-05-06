from django.contrib import admin
from django.utils.html import format_html

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
	list_display = ("title", "tag", "featured", "display_order", "created_at", "image_preview")
	list_filter = ("featured",)
	search_fields = ("title", "description")
	ordering = ("display_order", "-created_at")
	readonly_fields = ("image_preview",)

	def image_preview(self, obj):
		url = ""
		if obj.image and getattr(obj.image, "url", None):
			url = obj.image.url
		if not url:
			return "—"
		return format_html('<img src="{}" style="max-height: 80px; border-radius: 6px;" />', url)

	image_preview.short_description = "Preview"
