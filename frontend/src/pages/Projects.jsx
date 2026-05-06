import { useEffect, useState } from 'react'
import siteData from '../data/siteData.json'
import { ENABLE_FALLBACK, fetchProjects } from '../services/api.js'

function Projects() {
  const { featuredProjects = [] } = siteData
  const [projects, setProjects] = useState([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        if (data.length) {
          setProjects(data)
          return
        }
        if (ENABLE_FALLBACK && featuredProjects.length) {
          setProjects(featuredProjects)
        }
      })
      .catch(() => {
        if (ENABLE_FALLBACK && featuredProjects.length) {
          setProjects(featuredProjects)
          return
        }
        setHasError(true)
      })
  }, [])

  return (
    <div className="page">
      <header className="page-hero">
        <p className="section-eyebrow">Projects</p>
        <h1>Selected work across product, data, and content systems.</h1>
        <p className="lead">
          Each project is built with an outcomes-first mindset and a clean,
          maintainable architecture.
        </p>
      </header>

      <section className="page-section">
        {hasError ? (
          <div className="card">
            <p>Projects are unavailable right now. Please try again later.</p>
          </div>
        ) : (
          <div className="grid-2">
            {projects.map((project) => (
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
                  <p className="tag">{project.tag || 'Project'}</p>
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
      </section>
    </div>
  )
}

export default Projects
