from datetime import timedelta
from django.utils import timezone

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
            'session_id',
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
