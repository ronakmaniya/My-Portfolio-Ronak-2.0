from django.db import models


class Project(models.Model):
	title = models.CharField(max_length=200)
	description = models.TextField()
	tech_stack = models.JSONField(default=list)
	github_link = models.URLField(blank=True)
	live_link = models.URLField(blank=True)
	image_url = models.URLField(blank=True)
	featured = models.BooleanField(default=False)
	display_order = models.PositiveIntegerField(default=0)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ["display_order", "-created_at"]

	def __str__(self):
		return self.title
