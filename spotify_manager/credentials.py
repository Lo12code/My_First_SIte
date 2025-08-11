import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

SPOTIFY_DOTENV_PATH = os.path.join(BASE_DIR, '.env.spotify')
load_dotenv(dotenv_path=SPOTIFY_DOTENV_PATH)

CLIENT_ID = os.environ.get('CLIENT_ID')
CLIENT_SECRET = os.environ.get('CLIENT_SECRET')
REDIRECT_URL = os.environ.get('REDIRECT_URL')