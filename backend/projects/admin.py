from django.contrib import admin

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
	list_display = ("title", "tag", "featured", "display_order", "created_at")
	list_filter = ("featured",)
	search_fields = ("title", "description")
	ordering = ("display_order", "-created_at")
