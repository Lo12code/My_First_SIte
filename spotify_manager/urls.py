from django.urls import path

from .views import AuthUrl, SpotifyCallback

urlpatterns = [
    path('get-auth-url', AuthUrl.as_view()),
    path('redirect', SpotifyCallback.as_view())
]