<div align="center">

# ⚙️ Backend — Portfolio API

_Django + DRF API for [My-Portfolio-Ronak-2.0](https://github.com/ronakmaniya/My-Portfolio-Ronak-2.0)._

[![API](https://img.shields.io/badge/API-Render-5BE3B8?style=for-the-badge&logo=render&logoColor=black)](https://my-portfolio-ronak-2-0-backend.onrender.com/)
[![Admin](https://img.shields.io/badge/Admin-Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://my-portfolio-ronak-2-0-backend.onrender.com/admin/)

![Django](https://img.shields.io/badge/Django_6-092E20?logo=django&logoColor=white)
![DRF](https://img.shields.io/badge/DRF_3.17-ff1709?logo=django&logoColor=white)
![Postgres](https://img.shields.io/badge/Postgres-4169E1?logo=postgresql&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white)

**[🏠 Root README](../README.md) · [🏗️ Architecture](../Portfolio_Architecture.md) · [🎨 Frontend](../frontend/README.md)**

</div>

---

## ✨ What it does

- 📝 **Blog CMS** — categories + Markdown posts, grouped list, slug detail, published-only reads
- 🚀 **Projects CMS** — ordered/featured projects with Cloudinary images, admin-only create
- 📬 **Contact pipeline** — open create endpoint, admin-only inbox, newest first
- 🔑 **Admin-first** — all dynamic content managed in Django Admin, no custom CMS

## 🚀 Quickstart

Requires **Python 3.11+** (Windows shown; swap `.\.venv\Scripts\python` for `.venv/bin/python` on macOS/Linux).

```powershell
python -m venv .venv
.\.venv\Scripts\python -m pip install -r backend\requirements.txt
cd backend
Copy-Item .env.example .env   # fill in values, then:
..\.venv\Scripts\python manage.py migrate
..\.venv\Scripts\python manage.py createsuperuser
..\.venv\Scripts\python manage.py runserver   # → http://127.0.0.1:8000
```

Admin → http://127.0.0.1:8000/admin/

## 🔌 API reference

Base local: `http://127.0.0.1:8000/api` · Browsable HTML in `DEBUG` for staff, JSON-only in prod.

| Endpoint | Access |
|---|---|
| `GET /api/posts/` — posts grouped by category | Public |
| `GET /api/posts/<slug>/` — single published post (404 otherwise) | Public |
| `GET /api/projects/` — ordered by `display_order`, then newest | Public |
| `POST /api/projects/` | Admin only |
| `POST /api/contact/` — `{ name, email, message }` → `201` | Public |
| `GET /api/contact/submissions/` — inbox | Admin only |

```bash
curl -X POST http://127.0.0.1:8000/api/contact/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada","email":"ada@example.com","message":"Hello!"}'
```

Projects return a Cloudinary CDN link (`"image_url"`, `""` when imageless); anonymous writes get `403`.

## 🗃️ Models

| App | Model | Key fields |
|---|---|---|
| `blog` | `Category` | `name`, `slug` |
| `blog` | `Post` | `title`, `slug`, `excerpt` (auto), `content` (Markdown), `category` FK, `is_published`, timestamps |
| `projects` | `Project` | `title`, `tag`, `description`, `tech_stack` (JSON), links, `image`, `featured`, `display_order` |
| `contact` | `ContactMessage` | `name`, `email`, `message`, `created_at` |

Slugs are collision-safe (`-2`, `-3`, …); empty excerpts auto-generate from content.

**Admin workflow:** add Category → add Post (Markdown, toggle `is_published`) / add Project
(`featured`, `display_order`, upload `image`) → verify via `/api/*` → frontend picks it up.

## 🔧 Environment variables

Local-only `backend/.env` (never commit; mirror on Render). Template: [`.env.example`](./.env.example).

| Variable | Prod? | Purpose |
|---|---|---|
| `DJANGO_SECRET_KEY` | Required | Real secret (`DEBUG=false` refuses the dev key) |
| `DJANGO_DEBUG` | `false` | `true` locally only |
| `DJANGO_ALLOWED_HOSTS` | Required | Comma-separated backend hosts |
| `DJANGO_CORS_ALLOWED_ORIGINS` | Required | Comma-separated frontend origins |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | Required | Comma-separated `https://` frontend origins |
| `DATABASE_URL` | Required | Postgres URL (else local SQLite) |
| `CLOUDINARY_CLOUD_NAME` / `_KEY` / `_SECRET` | For images | Media storage credentials |
| `DJANGO_FRONTEND_URL` | Optional | Link on the `/` landing page |

## ☁️ Deploy

Render/Railway (run from `backend/`): build `bash build.sh` (install → `collectstatic` → `migrate`),
start `gunicorn core.wsgi`, one-time `createsuperuser`. Data doesn't transfer — recreate content in prod Admin.

<details>
<summary><strong>🔧 Troubleshooting</strong></summary>

| Symptom | Fix |
|---|---|
| `DJANGO_SECRET_KEY must be set` | Real secret required when `DEBUG=false` |
| `DisallowedHost` (400) | Backend host missing from `DJANGO_ALLOWED_HOSTS` |
| CORS/CSRF 403 on contact POST | Exact frontend origin missing from CORS + CSRF lists |
| `image_url: ""` | Cloudinary vars missing or no image uploaded |
| Empty DB after deploy | Migrations don't copy data — recreate in prod Admin |

</details>
