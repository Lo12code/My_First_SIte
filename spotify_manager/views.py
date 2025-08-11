from django.shortcuts import redirect
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from requests import Request

from .credentials import REDIRECT_URL, CLIENT_ID, CLIENT_SECRET
from .utils import update_or_create_user_token


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

        response = Request(
            'POST',
            'https://accounts.spotify.com/api/token',
            data={
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': REDIRECT_URL,
                'client_id': CLIENT_ID,
                'client_secret': CLIENT_SECRET,
            }
        ).prepare().send()

        access_token = response.get('access_token')
        token_type = response.get('token_type')
        refresh_token = response.get('refresh_token')
        expires_in = response.get('expires_in')
        error = response.get('error')

        if not request.session.exists(request.session.session_key):
            request.session.create()

        update_or_create_user_token(
            session_id=request.session.session_key,
            access_token=access_token,
            token_type=token_type,
            expires_in=expires_in,
            refresh_token=refresh_token
        )

        return redirect('frontend:')
    