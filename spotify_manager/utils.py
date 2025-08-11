from datetime import timedelta
from django.utils import timezone
from requests import post

from .credentials import CLIENT_ID, CLIENT_SECRET
from .models import SpotifyToken


def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None

def update_or_create_user_token(
    session_id,
    access_token,
    token_type,
    expires_in,
    refresh_token
):
    token = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if token:
        token.access_token = access_token
        token.refresh_token = refresh_token
        token.expires_in = expires_in
        token.token_type = token_type
        token.save(update_fields=[
            'user',
            'access_token',
            'token_type',
            'expires_in',
            'refresh_token',
        ])
    else:
        token = SpotifyToken(
            user=session_id,
            access_token=access_token,
            refresh_token=refresh_token,
            token_type=token_type,
            expires_in=expires_in
        )
        token.save()

def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            refresh_spotify_token(session_id)
        return True
    return False

def refresh_spotify_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    refresh_token_new = response.get("refresh_token", refresh_token)

    update_or_create_user_token(
        session_id=session_id,
        access_token=access_token,
        token_type=token_type,
        expires_in=expires_in,
        refresh_token=refresh_token_new
    )
