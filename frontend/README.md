# Frontend (React + Vite)

Frontend for the portfolio + blog system. Built with React and Vite.

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

Note: `.env` is for local development only and should not be committed. In production, set the same variables in your hosting platform.

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

## Data sources

- Primary site data: `src/data/siteData.json`
- Optional test content: `src/data/blogContent.json`
- API data is fetched from the Django backend (see backend README)

## Fallback behavior

When `VITE_ENABLE_FALLBACK=true`, the UI uses:

- `featuredProjects` and `blogPosts` from `siteData.json` if the API is unreachable
- markdown rendering via `react-markdown` + `remark-gfm`

## API usage

- `GET /api/projects/`
- `GET /api/posts/`
- `GET /api/posts/<slug>/`
- `POST /api/contact/`
