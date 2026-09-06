<div align="center">

# 🎨 Frontend — Portfolio SPA

_React + Vite single-page app for [My-Portfolio-Ronak-2.0](https://github.com/ronakmaniya/My-Portfolio-Ronak-2.0)._

[![Live](https://img.shields.io/badge/Live-Vercel-00C7B7?style=for-the-badge&logo=vercel&logoColor=white)](https://ronak-maniya.vercel.app/)

![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black)
![Router](https://img.shields.io/badge/Router_7-CA4245?logo=reactrouter&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-38BDF8?logo=tailwindcss&logoColor=white)

**[🏠 Root README](../README.md) · [🏗️ Architecture](../Portfolio_Architecture.md) · [⚙️ Backend](../backend/README.md)**

</div>

---

## ✨ What it does

- 🖥️ Pages: Home, About, Projects, Blog list/detail, Contact, 404
- 📝 Blog with category groups, slug URLs, and Markdown rendering
- 🚀 Projects grid + featured section fed by the API
- 📬 Contact form wired to `POST /api/contact/`
- 🌗 Light/dark theme, persisted, respects OS preference
- 📴 Optional offline fallback to `siteData.json`

## 🚀 Quickstart

Requires **Node 18+**. Point it at the backend (default `http://127.0.0.1:8000`).

```bash
cd frontend && cp .env.example .env && npm install && npm run dev
# → http://localhost:5173
```

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the build |
| `npm run lint` | ESLint |

## 🔧 Environment variables

Local-only `.env` (never commit; mirror in Vercel). `VITE_*` bake in at build time — rebuild after changes.

| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_BASE_URL` | `http://127.0.0.1:8000` | Backend origin (`/api` appended in code) |
| `VITE_ENABLE_FALLBACK` | `false` | `true` → use `siteData.json` when the API fails |

## 🗺️ Routes

| Route | Data |
|---|---|
| `/` Home | JSON copy + featured projects + latest 3 posts |
| `/about` | Experience / education from JSON |
| `/projects` | Full list from `GET /api/projects/` |
| `/blog` | `GET /api/posts/` grouped by category |
| `/blog/:slug` | `GET /api/posts/:slug/`, Markdown body |
| `/contact` | Form → `POST /api/contact/` |

## 🔌 API layer

All HTTP lives in `src/services/api.js` — pages never hardcode URLs:

```js
fetchProjects()            // GET /api/projects/
fetchPostsByCategory()     // GET /api/posts/ → { categories: [...] }
fetchPostBySlug(slug)      // GET /api/posts/{slug}/
submitContact({ name, email, message })  // POST /api/contact/
```

Static copy (`name`, `skills`, `experience`, …) is edited in `src/data/siteData.json` only —
no component changes needed. Fallback entries mirror the API shape (`image_url`, `slug`, `excerpt`).

## 📁 Structure

```text
src/
├── pages/          Home, About, Projects, BlogList, BlogDetail, Contact, NotFound
├── components/     Navbar (theme toggle), Footer
├── services/api.js API base + fallback flag + 4 helpers
├── data/siteData.json  static content + fallback data
├── App.jsx         routes, theme, scroll restoration
└── index.css       Tailwind v4 + theme tokens
```

## ☁️ Deploy

Vercel: root `frontend/`, build `npm run build`, output `dist/`
(`vercel.json` handles SPA rewrites). Set `VITE_API_BASE_URL` to the prod backend.

<details>
<summary><strong>🔧 Troubleshooting</strong></summary>

| Symptom | Fix |
|---|---|
| Empty sections / fallback | Wrong `VITE_API_BASE_URL` or backend cold-starting — check Network tab |
| Env change ignored | Restart dev; rebuild/redeploy for prod (Vite inlines `VITE_*`) |
| Styles missing | `main.jsx` must import `./index.css`; Tailwind Vite plugin registered |
| 404 on refresh (prod) | Missing SPA rewrite — ensure `vercel.json` is deployed |

</details>
