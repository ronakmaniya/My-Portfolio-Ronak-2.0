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

Server URL: http://127.0.0.1:8000/
Admin URL: http://127.0.0.1:8000/admin/

## Project structure

- Apps: `blog`, `contact`, `projects`
- API base: `/api/`

## API endpoints

Blog

- `GET /api/posts/` returns posts grouped by category
- `GET /api/posts/<slug>/` returns a single post

Contact

- `POST /api/contact/` create a contact message
- `GET /api/contact/submissions/` list messages (admin only)

Projects

- `GET /api/projects/` list projects
- `POST /api/projects/` create project (admin only)

## Data models

Blog

- Category: `name`, `slug`
- Post: `title`, `slug`, `content`, `category`, `is_published`, `created_at`

Contact

- ContactMessage: `name`, `email`, `message`, `created_at`

Projects

- Project: `title`, `description`, `tech_stack`, `github_link`, `live_link`, `image_url`, `featured`, `display_order`, `created_at`

## Project images

- `image_url` is stored as a URL string
- Recommended: use a free tier image CDN (Cloudinary or ImageKit)

## CORS

- `http://localhost:5173` is allowed for the Vite dev server
