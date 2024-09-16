#!/bin/bash

# This script is used to start the container for django development

APP_PORT=${PORT:-8001}

## make migrations and migrate for postgres
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py collectstatic --noinput 

# create superuser
# python3 manage.py createsuperuser --noinput || true

# start server
# python3 manage.py runserver 0.0.0.0:8000 using django server

# using gunicorn server
gunicorn  backend.wsgi:application --bind "0.0.0.0:${APP_PORT}"