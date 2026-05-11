# Full-Stack Portfolio + Blog System

A full-stack developer portfolio with an integrated blog and projects system. The frontend is built with React (Vite) and the backend uses Django + Django REST Framework. Static site content is managed via JSON for fast updates, while dynamic content (blog, projects, contact) is managed through Django Admin.

## Live Website

- Production URL: https://ronak-maniya.vercel.app/
- Hosting Platform: Vercel (https://vercel.com/)
- Backend API URL: https://my-portfolio-ronak-2-0-backend.onrender.com/
- Backend Hosting Platform: Render (https://render.com/)

## Legacy Portfolio (Old Repo)

The earlier static HTML/CSS/JavaScript portfolio is archived here:
https://github.com/ronakmaniya/My-Portfolio-Ronak

## Highlights

- Hybrid content model: static JSON + dynamic API
- Blog with categories and Markdown rendering
- Projects and contact system managed via Django Admin
- Responsive, modern UI with light/dark theme support
- Cloudinary-backed media uploads (project images)

## Tech Stack

**Frontend**
- React + Vite
- React Router
- React Markdown + remark-gfm

**Backend**
- Django + Django REST Framework
- Django CORS Headers
- Cloudinary Storage

**Database**
- SQLite (dev)
- PostgreSQL (prod-ready via env vars)

## Project Structure

```
backend/                 Django backend
  blog/                  Blog app
  contact/               Contact form app
  projects/              Projects app
  core/                  Django settings
frontend/                React frontend
  src/
    components/
    pages/
    data/
    services/
Portfolio_Architecture.md
README.md
```

## Requirements

- Node.js 18+ and npm
- Python 3.11+

## Setup

### 1) Backend

```bash
python -m venv .venv
.\.venv\Scripts\python -m pip install --upgrade pip
.\.venv\Scripts\python -m pip install -r backend\requirements.txt
cd backend
```

Create a `.env` file in `backend/` (or copy `.env.example`) and set:

- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG`
- `DJANGO_ALLOWED_HOSTS`
- `DJANGO_CORS_ALLOWED_ORIGINS`
- `DJANGO_DB_ENGINE`, `DJANGO_DB_NAME`, `DJANGO_DB_USER`, `DJANGO_DB_PASSWORD`, `DJANGO_DB_HOST`, `DJANGO_DB_PORT`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

Run migrations and start the server:

```bash
..\.venv\Scripts\python manage.py migrate
..\.venv\Scripts\python manage.py createsuperuser
..\.venv\Scripts\python manage.py runserver
```

Backend runs at: `http://127.0.0.1:8000/`

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file in `frontend/` (or copy `.env.example`) and set:

- `VITE_API_BASE_URL` (default: `http://127.0.0.1:8000`)
- `VITE_ENABLE_FALLBACK` (`true` to use local JSON if API is unavailable)

Frontend runs at: `http://localhost:5173/`

## API Endpoints

**Blog**
- `GET /api/posts/` (grouped by category)
- `GET /api/posts/<slug>/`

**Projects**
- `GET /api/projects/`
- `POST /api/projects/` (admin only)

**Contact**
- `POST /api/contact/`
- `GET /api/contact/submissions/` (admin only)

## Content Management

- Static content lives in `frontend/src/data/siteData.json`
- Dynamic content (blog, projects, contact) is managed via Django Admin

## Cloudinary Setup (Brief)

1) Create a Cloudinary account and a new cloud.
2) Copy the credentials from the Cloudinary dashboard:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
3) Add those values to:
- `backend/.env` for local development
- Your backend host environment variables for production
4) Test an image upload by creating or updating a Project in Django Admin.

## Deployment Notes

- Frontend: Vercel or Netlify
- Backend: Render or Railway
- Configure environment variables in your hosting platform

## Deployment Steps (Brief)

1) Backend (Render/Railway)
- Copy variables from `backend/.env.example` into your hosting provider
- Build command: `bash build.sh` (runs `pip install`, `collectstatic`, `migrate`)
- Start command: `gunicorn core.wsgi` (matches `backend/Procfile`)
- Create admin user once after deploy: `python manage.py createsuperuser`

2) Frontend (Vercel/Netlify)
- Copy variables from `frontend/.env.example` into your hosting provider
- Set `VITE_API_BASE_URL` to the deployed backend URL
- Build command: `npm run build`
- Output directory: `dist` (SPA routing handled by `frontend/vercel.json`)

3) Final checks
- Update `DJANGO_ALLOWED_HOSTS` and `DJANGO_CORS_ALLOWED_ORIGINS`
- Verify API endpoints and image uploads work

## Scripts

Frontend:
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

Backend:
- `python manage.py runserver`
- `python manage.py migrate`
- `python manage.py createsuperuser`

## License

This project is intended for personal portfolio use.
