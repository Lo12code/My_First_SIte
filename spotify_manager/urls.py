from django.urls import path

from .views import AuthUrl, \
    SpotifyCallback, \
    IsAuthenticated, \
    CurrentSong, \
    PauseSong, \
    PlaySong

urlpatterns = [
    path('get-auth-url', AuthUrl.as_view()),
    path('redirect', SpotifyCallback.as_view()),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('current-song', CurrentSong.as_view()),
    path('pause', PauseSong.as_view()),
    path('play', PlaySong.as_view())
]
