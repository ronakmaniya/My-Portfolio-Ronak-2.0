# Backend (Django + DRF)

Backend for the portfolio + blog system. Built with Django and Django REST Framework.

## Requirements

- Python 3.11+ (recommended)
- pip

## Setup (Windows PowerShell)

```bash
cd ..
python -m venv .venv
.\.venv\Scripts\python -m pip install --upgrade pip
.\.venv\Scripts\python -m pip install -r backend\requirements.txt
cd backend
```

## Environment variables

Create a `.env` file in `backend/` or copy `.env.example`.

Note: `.env` is for local development only and should not be committed. In production, set the same variables in your hosting platform.

- `DJANGO_SECRET_KEY` - required in production
- `DJANGO_DEBUG` - `true` or `false`
- `DJANGO_ALLOWED_HOSTS` - comma-separated
- `DJANGO_CORS_ALLOWED_ORIGINS` - comma-separated
- `DJANGO_DB_ENGINE`, `DJANGO_DB_NAME`, `DJANGO_DB_USER`, `DJANGO_DB_PASSWORD`, `DJANGO_DB_HOST`, `DJANGO_DB_PORT`

## Run migrations

```bash
..\.venv\Scripts\python manage.py migrate
```

## Create admin user

```bash
..\.venv\Scripts\python manage.py createsuperuser
```

## Run the dev server

```bash
..\.venv\Scripts\python manage.py runserver
```

- Server URL: http://127.0.0.1:8000/
- Admin URL: http://127.0.0.1:8000/admin/

## Project structure

- Apps: `blog`, `contact`, `projects`
- API base: `/api/`

## API endpoints

Blog

- `GET /api/posts/` returns published posts grouped by category
- `GET /api/posts/<slug>/` returns a single published post

Contact

- `POST /api/contact/` create a contact message
- `GET /api/contact/submissions/` list messages (admin only)

Projects

- `GET /api/projects/` list projects
- `POST /api/projects/` create project (admin only)

## Data models

Blog

- Category: `name`, `slug`
- Post: `title`, `slug`, `excerpt`, `content`, `category`, `is_published`, `created_at`, `updated_at`

Contact

- ContactMessage: `name`, `email`, `message`, `created_at`

Projects

- Project: `title`, `tag`, `description`, `tech_stack`, `github_link`, `live_link`, `image_url`, `featured`, `display_order`, `created_at`

## Notes

- `excerpt` can be auto-generated when empty in the admin
- `image_url` is stored as a URL string
- Recommended: use a free tier image CDN (Cloudinary or ImageKit)

## CORS

- `http://localhost:5173` is allowed for the Vite dev server
