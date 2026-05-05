from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/posts/', include('blog.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/projects/', include('projects.urls')),
]
