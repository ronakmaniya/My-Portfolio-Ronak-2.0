from django.db import models
from django.utils.text import slugify


class Category(models.Model):
	name = models.CharField(max_length=100, unique=True)
	slug = models.SlugField(max_length=120, unique=True)

	class Meta:
		ordering = ["name"]

	def __str__(self):
		return self.name


def unique_slugify(model, base_text, instance_id=None):
	base_slug = slugify(base_text)
	slug = base_slug
	counter = 2
	queryset = model.objects.all()
	if instance_id is not None:
		queryset = queryset.exclude(id=instance_id)
	while queryset.filter(slug=slug).exists():
		slug = f"{base_slug}-{counter}"
		counter += 1
	return slug


class Post(models.Model):
	title = models.CharField(max_length=200)
	slug = models.SlugField(max_length=220, unique=True)
	excerpt = models.TextField(blank=True)
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
		if not self.excerpt and self.content:
			collapsed = " ".join(self.content.split())
			self.excerpt = (
				f"{collapsed[:200].rstrip()}..." if len(collapsed) > 200 else collapsed
			)
		super().save(*args, **kwargs)
