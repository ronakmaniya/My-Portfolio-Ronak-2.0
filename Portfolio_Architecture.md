# 🧩 FULL-STACK PORTFOLIO + INTEGRATED BLOG SYSTEM

## 🎯 OBJECTIVE

Build a **developer portfolio website with an integrated blog system** from scratch.

- Frontend: React (Vite)
- Backend: Django + Django REST Framework
- Database: SQLite (dev) → PostgreSQL (prod)
- Blog system fully inside project (`/blog` route)
- Admin-controlled content via Django Admin

---

# 🏗️ SYSTEM ARCHITECTURE

## High-Level Structure

Frontend (React)

- Portfolio Pages
- Blog UI
- Projects UI (dynamic)
- Static Content (JSON-based)
- API Integration

Backend (Django)

- Blog CMS (Post model)
- Contact/Feedback System
- Projects System (like CMS)
- REST API
- Admin panel

Database

- Stores blog posts
- Stores contact messages
- Stores projects

---

# ⚖️ CONTENT STRATEGY (VERY IMPORTANT)

## 🎯 HYBRID APPROACH

---

## 1. STATIC CONTENT (JSON-BASED)

👉 Stored in frontend as JSON files  
👉 Rarely changes  
👉 No backend required  

### Used For:

- Intro / Hero section
- Skills
- About content
- Basic personal info

---

### 📁 Example JSON Structure

frontend/src/data/siteData.json

```json
{
  "name": "Your Name",
  "title": "Full Stack Developer",
  "intro": "I build scalable web apps",
  "skills": ["React", "Django", "PostgreSQL"]
}
```

---

### ✅ Advantages

- No need to modify React code for content changes
- Easy updates
- Works like config system
- Clean separation of content & logic

---

## 2. DYNAMIC CONTENT (BACKEND-DRIVEN)

👉 Managed via Django Admin  
👉 Comes from API  

### Includes:

- Blog ✅
- Contact form ✅
- Projects ✅

---

# 📁 PROJECT STRUCTURE (FINAL)

project_root/

---

## Backend (Django)

- backend/
  - blog/                ← handles blog only

    - models.py
    - views.py
    - serializers.py
    - urls.py

  - contact/             ← feedback system

    - models.py
    - views.py
    - serializers.py
    - urls.py

  - projects/            ← projects system

    - models.py
    - views.py
    - serializers.py
    - urls.py

  - core/

  - manage.py

👉 **IMPORTANT DECISION:**

- Blog, Contact, Projects = **separate apps**
- Clean, scalable architecture

---

## Frontend (React)

frontend/

- src/
  - pages/
    - Home.jsx
    - About.jsx
    - Projects.jsx
    - BlogList.jsx
    - BlogDetail.jsx
    - Contact.jsx
  - components/
    - Navbar.jsx
    - Footer.jsx
    - BlogCard.jsx
    - ProjectCard.jsx
  - services/
    - api.js
  - data/
    - siteData.json   ← static content

---

# 🚀 PHASE 1: BACKEND SETUP

## 1. Install Dependencies

pip install django djangorestframework django-cors-headers

---

# 📝 BLOG SYSTEM (WITH CATEGORY)

## Blog Model (blog app)

- title: string
- slug: unique
- content: text (Markdown)
- created_at: datetime

---

## Category Model

- name: string
- slug: unique

---

## Post Model Update

- category: ForeignKey(Category, on_delete=CASCADE, related_name="posts")

---

## Blog Serializer

- title
- slug
- content
- created_at
- category

---

## Category Serializer

- name
- slug

---

## Blog API

GET /api/posts/
→ Return posts grouped by category

### Example Response:

{
  "categories": [
    {
      "name": "Django",
      "slug": "django",
      "posts": [
        { "title": "...", "slug": "..." }
      ]
    }
  ]
}

GET /api/posts/<slug>/
→ Single blog

POST /api/posts/
→ Admin only

---

## Blog Admin

- Register Post model
- Register Category model
- Assign category to posts

---

# 📬 CONTACT SYSTEM

## Contact Model (contact app)

- name
- email
- message
- created_at

---

## Contact Serializer

- name
- email
- message

---

## Contact API

POST /api/contact/

Behavior:

- Validate fields
- Save to database
- Return success

---

## Contact Admin

- Register model
- View submissions

---

# 🚀 PROJECTS SYSTEM

## Projects Model (projects app)

- title
- description
- tech_stack (JSONField or Text)
- github_link
- live_link
- image
- created_at

👉 Flat list (no category)

### Project Images (Hosting Strategy)

- Use the `image` field in the Project model
- Images are uploaded in Django Admin and stored in Cloudinary
- Backend returns the CDN URL in the API response

---

## Projects Serializer

- title
- description
- tech_stack
- github_link
- live_link
- image
- created_at

---

## Projects API

GET /api/projects/
→ Returns all projects (latest first)

POST /api/projects/
→ Admin only

---

## Projects Admin

- Register Project model
- Add/edit/delete projects

---

# 🎨 PHASE 2: FRONTEND SETUP

## Static JSON Usage

import siteData from "../data/siteData.json";

Use for:

- Home page
- About section
- Skills

---

## Blog List Page

Features:

- Fetch /api/posts/
- Display category-wise blogs

---

## Blog Detail Page

Features:

- Fetch by slug
- Render Markdown using react-markdown

---

## Projects Page

Route:
/projects

Features:

- Fetch /api/projects/
- Display projects dynamically

---

## Contact Page

Route:
/contact

Fields:

- Name
- Email
- Message

---

## API Integration

- fetchPosts()
- fetchPostBySlug(slug)
- fetchProjects()
- sendContactForm(data)

---

## Contact Form Logic

- Controlled inputs
- POST request
- Loading state
- Success message
- Error handling

---

# 🧠 PHASE 3: PORTFOLIO FEATURES

## Sections

Home:

- Intro (JSON)
- Skills (JSON)
- Latest blogs (API)
- Featured projects (API)

Projects:

- Fully dynamic (API-based)

Blog:

- Category-based system

Contact:

- Contact form + social links

---

# ⚡ PHASE 4: BLOG ENHANCEMENTS

- Markdown support
- Syntax highlighting
- Reading time
- Category filtering UI
- Pagination

---

# 🔍 SEO BASICS

- Dynamic title
- Meta description
- Clean slug URLs

Example:

yourdomain.com/blog/how-to-deploy-django

---

# 🔐 AUTHENTICATION (OPTIONAL)

Use Django Admin for:

- Blog posts
- Projects
- Contact messages

---

# 🚀 DEPLOYMENT STRATEGY

Frontend → Netlify / Vercel  
Backend → Render / Railway  

Structure:

- yourname.com → frontend  
- API hosted separately  

---

# ⚠️ DO NOT DO

- Do NOT hardcode dynamic content
- Do NOT mix JSON + API incorrectly
- Do NOT overcomplicate admin
- Do NOT build custom admin panel

---

# ✅ FINAL EXPECTED OUTPUT

✔ Static content via JSON  
✔ Blog system (category-based)  
✔ Projects system (dynamic)  
✔ Contact system (dynamic)  
✔ Clean architecture  
✔ Scalable structure  

---

# 💡 DEVELOPMENT STRATEGY

Step 1: Backend APIs (blog + contact + projects)  
Step 2: Static JSON setup  
Step 3: Frontend UI  
Step 4: API integration  
Step 5: Polish UI  

---

# 🧪 SUCCESS CRITERIA

- Static content loads from JSON  
- Blog works with categories  
- Projects load from API  
- Contact form works  
- Clean UI  
- No broken routes or APIs  

---

END OF SPEC
