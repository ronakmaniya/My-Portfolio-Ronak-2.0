import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import siteData from '../data/siteData.json'
import { ENABLE_FALLBACK, fetchPostsByCategory, fetchProjects } from '../services/api.js'

const initialsFromName = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

const pickFeaturedProjects = (projects) =>
  projects.filter((project) => project.featured).slice(0, 2)

const flattenPosts = (categories) =>
  categories.flatMap((category) =>
    category.posts.map((post) => ({ ...post, category: category.name }))
  )

function Home() {
  const {
    name,
    title,
    location,
    availability,
    intro,
    summary,
    stats,
    highlights,
    skills,
    services,
    contact,
    featuredProjects = [],
    blogPosts = [],
  } = siteData

  const [projectItems, setProjectItems] = useState([])
  const [postItems, setPostItems] = useState([])
  const [errors, setErrors] = useState({ projects: false, posts: false })

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        setProjectItems(pickFeaturedProjects(data))
      })
      .catch(() => {
        if (ENABLE_FALLBACK && featuredProjects.length) {
          setProjectItems(featuredProjects)
          return
        }
        setErrors((prev) => ({ ...prev, projects: true }))
      })
  }, [])

  useEffect(() => {
    fetchPostsByCategory()
      .then((data) => {
        const categories = data.categories || []
        const posts = flattenPosts(categories)
        setPostItems(posts.slice(0, 3))
      })
      .catch(() => {
        if (ENABLE_FALLBACK && blogPosts.length) {
          setPostItems(blogPosts.slice(0, 3))
          return
        }
        setErrors((prev) => ({ ...prev, posts: true }))
      })
  }, [])

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-grid">
          <div className="hero-copy reveal" style={{ '--delay': '0.1s' }}>
            <p className="eyebrow">{availability}</p>
            <h1>
              {name}
              <span>{title}</span>
            </h1>
            <p className="lead">{intro}</p>
            <div className="hero-actions">
              <Link className="btn primary" to="/contact">
                Lets talk
              </Link>
              <Link className="btn ghost" to="/projects">
                View projects
              </Link>
            </div>
            <div className="hero-meta">
              <span>{location}</span>
              <span>{contact.email}</span>
            </div>
          </div>

          <div className="hero-card reveal" style={{ '--delay': '0.25s' }}>
            <div className="portrait" aria-hidden="true">
              <span>{initialsFromName(name)}</span>
            </div>
            <div className="stat-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="stat">
                  <p className="stat-value">{stat.value}</p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="highlight-list">
              {highlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="section reveal" style={{ '--delay': '0.1s' }}>
        <div className="section-heading">
          <p className="section-eyebrow">About</p>
          <h2>Building digital products with a strong engineering core.</h2>
        </div>
        <div className="section-content">
          <p>{summary}</p>
          <div className="pill-row">
            {highlights.map((item) => (
              <span key={item} className="pill">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal" style={{ '--delay': '0.15s' }}>
        <div className="section-heading">
          <p className="section-eyebrow">Skills</p>
          <h2>Focused on modern stacks and dependable delivery.</h2>
        </div>
        <div className="grid-3">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="card">
              <h3>{group}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section reveal" style={{ '--delay': '0.2s' }}>
        <div className="section-heading">
          <p className="section-eyebrow">Services</p>
          <h2>What I build for teams and startups.</h2>
        </div>
        <div className="grid-3">
          {services.map((service) => (
            <div key={service.title} className="card accent">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section reveal" style={{ '--delay': '0.2s' }}>
        <div className="section-heading">
          <p className="section-eyebrow">Featured Projects</p>
          <h2>Proof of craft with real-world outcomes.</h2>
        </div>
        {errors.projects ? (
          <div className="card">
            <p>Projects are unavailable right now. Please try again later.</p>
          </div>
        ) : (
          <div className="grid-2">
            {projectItems.map((project) => (
              <article key={project.title} className="project-card">
                <div className="project-media">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} />
                  ) : (
                    <div className="project-placeholder">
                      {project.title.split(' ').slice(0, 2).join(' ')}
                    </div>
                  )}
                </div>
                <div className="project-body">
                  <p className="tag">{project.tag || 'Featured project'}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="stack">
                    {(project.tech_stack || []).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.live_link} target="_blank" rel="noreferrer">
                      Live
                    </a>
                    <a href={project.github_link} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="section-cta">
          <Link className="btn ghost" to="/projects">
            View all projects
          </Link>
        </div>
      </section>

      <section className="section reveal" style={{ '--delay': '0.25s' }}>
        <div className="section-heading">
          <p className="section-eyebrow">Writing</p>
          <h2>Latest notes on product engineering.</h2>
        </div>
        {errors.posts ? (
          <div className="card">
            <p>Blog posts are unavailable right now. Please try again later.</p>
          </div>
        ) : (
          <div className="grid-3">
            {postItems.map((post) => (
              <article key={post.slug} className="card">
                <p className="tag">{post.category || 'Writing'}</p>
                <h3>{post.title}</h3>
                <p>{post.excerpt || 'Read the full article for details.'}</p>
                <div className="card-meta">
                  <span>{post.date || post.created_at?.slice(0, 10)}</span>
                  <Link to={`/blog/${post.slug}`}>Read more</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
