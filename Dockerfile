# Dockerfile - Template for Django Application

# 1. Base Image: Use an official Python runtime as a parent image
# Choose a specific version for consistency (e.g., 3.11, 3.10, etc.)
FROM python:3.11-slim-bullseye

# Set environment variables to prevent Python from writing pyc files and buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 2. Install System Dependencies
# Update apt and install dependencies needed for your project
# Example: postgresql-client for psycopg2, build-essential for some packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    # Add system dependencies here, e.g.:
    # build-essential \
    libpq-dev \
    # python3-dev # Sometimes needed for C extensions
    # netcat # Useful for waiting for DB
    && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 3. Set Working Directory
WORKDIR /code

# 4. Install Python Dependencies
# Copy only requirements first to leverage Docker cache
COPY requirements.txt /code/
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# 5. Copy Application Code
# Copy the rest of your application code into the image
COPY . /code/

# 6. (Optional but Recommended) Create a non-root user and switch to it
# RUN addgroup --system app && adduser --system --group app
# USER app
# If you create a non-root user, ensure file permissions allow this user to run the app
# and potentially write to media/static directories if not using volumes exclusively

# 7. Expose Port (Internal)
# Expose the port the app runs on (matches Gunicorn/runserver bind port)
# This does NOT publish the port to the host, just documents it
EXPOSE 8000

# 8. Default Command (Optional - often overridden in docker-compose.yml)
# For development, you might use runserver (but usually set in docker-compose.dev.yml)
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# For production, you might set Gunicorn here (but usually set in docker-compose.yml)
# CMD ["gunicorn", "seu_projeto.wsgi:application", "--bind", "0.0.0.0:8000"]
