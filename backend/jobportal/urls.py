from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from core.views import JobListView
from django.http import JsonResponse

def root_view(request):
    return JsonResponse({"message": "Welcome to the Job Portal Backend API"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', root_view), 
    path('api/', include('core.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
