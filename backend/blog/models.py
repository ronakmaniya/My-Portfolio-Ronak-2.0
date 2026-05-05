from django.db import models
from django.utils.text import slugify


class Category(models.Model):
	name = models.CharField(max_length=100, unique=True)
	slug = models.SlugField(max_length=120, unique=True)

	class Meta:
		ordering = ["name"]

	def __str__(self):
		return self.name


class Post(models.Model):
	title = models.CharField(max_length=200)
	slug = models.SlugField(max_length=220, unique=True)
	content = models.TextField()
	category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="posts")
	is_published = models.BooleanField(default=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ["-created_at"]

	def __str__(self):
		return self.title

	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = slugify(self.title)
		super().save(*args, **kwargs)
