# Backend (Django + DRF)

This is the backend for the portfolio + blog system. It uses Django and Django REST Framework.

## Requirements

- Python 3.11+ (recommended)
- pip

## Setup (Windows PowerShell)

```bash
python -m venv .venv
.\.venv\Scripts\python -m pip install --upgrade pip
.\.venv\Scripts\python -m pip install -r requirements.txt
```

## Run migrations

```bash
.\.venv\Scripts\python manage.py migrate
```

## Create admin user

```bash
.\.venv\Scripts\python manage.py createsuperuser
```

## Run the dev server

```bash
.\.venv\Scripts\python manage.py runserver
```

## Project notes

- Apps: `blog`, `contact`, `projects`
- API base: `/api/`
