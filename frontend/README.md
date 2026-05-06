# Frontend (React + Vite)

This is the frontend for the portfolio + blog system. It uses React with Vite.

## Requirements

- Node.js 18+ (recommended)
- npm

## Install dependencies

```bash
npm install
```

## Run the dev server

```bash
npm run dev
```

Vite will print the local URL (usually http://localhost:5173).

## Environment variables

Create a `.env` file in this folder or copy `.env.example`.

- `VITE_API_BASE_URL` - Django API base URL (default http://127.0.0.1:8000).
- `VITE_ENABLE_FALLBACK` - When `true`, use local `siteData.json` as a fallback if the API is unreachable.

## Production build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Project notes

- Static content lives in `src/data/siteData.json`.
- API data is fetched from the Django backend (see backend README).
- Fallback data uses `featuredProjects` and `blogPosts` from `siteData.json` when enabled.
- Markdown is rendered with `react-markdown` and `remark-gfm`.

## API usage

- `GET /api/projects/`
- `GET /api/posts/`
- `GET /api/posts/<slug>/`
- `POST /api/contact/`
