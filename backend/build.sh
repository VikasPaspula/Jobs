#!/bin/bash

# Install Python dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Collect static files (if using static files)
python manage.py collectstatic --noinput
