from django.shortcuts import redirect
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from requests import Request, post

from api.models import Room
from .credentials import REDIRECT_URL, CLIENT_ID, CLIENT_SECRET
from .utils import update_or_create_user_token, is_spotify_authenticated, execute_spotify_api_request


class AuthUrl(APIView):
    def get(self, request, format=None):
        scopes = 'user-read-playback-state' \
        ' user-modify-playback-state' \
        ' user-read-currently-playing'

        url = Request(
            'GET',
            'https://accounts.spotify.com/authorize',
            params={
                'scope': scopes,
                'response_type': 'code',
                'redirect_uri': REDIRECT_URL,
                'client_id': CLIENT_ID
            }
        ).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)

class SpotifyCallback(APIView):
    def get(self, request, format=None):
        code = request.GET.get('code')
        error = request.GET.get('error')
        if error:
            return Response({"error": error}, status=status.HTTP_400_BAD_REQUEST)

        response = post(
            'https://accounts.spotify.com/api/token',
            data={
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': REDIRECT_URL,
                'client_id': CLIENT_ID,
                'client_secret': CLIENT_SECRET,
            }
        ).json()

        access_token = response.get('access_token')
        token_type = response.get('token_type')
        refresh_token = response.get('refresh_token')
        expires_in = response.get('expires_in')

        if not request.session.exists(request.session.session_key):
            request.session.create()

        update_or_create_user_token(
            session_id=request.session.session_key,
            access_token=access_token,
            token_type=token_type,
            expires_in=expires_in,
            refresh_token=refresh_token
        )

        return redirect('/')

class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)

class CurrentSong(APIView):
    def get(self, request, format=None):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code).first()
        if not room:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        host = room.host
        endpoint = "player/currently-playing"
        response = execute_spotify_api_request(host, endpoint)
        
        if 'error' in response or 'item' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        item = response.get("item")
        duration =item.get("duration_ms")
        title = item.get('name')
        progress = response.get('progress_ms')
        album_cover = item.get('album').get('images')[0].get('url')
        is_playing = response.get('is_playing')
        song_id = item.get('id')

        artist_string = ""
        for i, artist in enumerate(item.get('artists')):
            if i > 0:
                artist_string += ", "
            name = artist.get('name')
            artist_string += name

        song = {
            'title': title,
            'artist': artist_string,
            'duration': duration,
            'time': progress,
            'image_url': album_cover,
            'is_playing': is_playing,
            'votes': 0,
            'id': song_id
        }

        return Response(song, status=status.HTTP_200_OK)
