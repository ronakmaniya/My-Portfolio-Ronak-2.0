from django.contrib import admin
from django.urls import include, path

from .views import root

urlpatterns = [
    path('', root, name='root'),
    path('admin/', admin.site.urls),
    path('api/posts/', include('blog.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/projects/', include('projects.urls')),
]
