from django.conf import settings
from django.shortcuts import render


def root(request):
    return render(
        request,
        "core/index.html",
        {
            "frontend_url": settings.FRONTEND_URL,
            "show_api": settings.DEBUG,
        },
    )
