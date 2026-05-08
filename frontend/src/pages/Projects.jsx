import { useEffect, useState } from 'react'
import siteData from '../data/siteData.json'
import { ENABLE_FALLBACK, fetchProjects } from '../services/api.js'

function Projects() {
  const { featuredProjects = [] } = siteData
  const fallbackProjects = ENABLE_FALLBACK ? featuredProjects : []
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
    <div className="flex flex-col gap-7 pb-4 pt-2">
      <header className="rounded-[24px] border border-edge bg-paper-strong p-8 shadow-soft max-[720px]:p-6">
        <p className="mb-2 text-[12px] uppercase tracking-[2px] text-accent-strong">Projects</p>
        <h1 className="text-[clamp(2.4rem,3.5vw,3.6rem)] leading-[1.15]">Selected work across product, data, and content systems.</h1>
        <p className="text-[1.05rem] text-ink-soft max-w-[540px]">
          Each project is built with an outcomes-first mindset and a clean,
          maintainable architecture.
        </p>
      </header>

      <section className="flex flex-col gap-5">
        {!projects.length && !fallbackProjects.length && hasError ? (
          <div className="card">
            <p>Projects are unavailable right now. Please try again later.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {(projects.length ? projects : fallbackProjects).map((project) => (
              <article key={project.title} className="group grid overflow-hidden rounded-[22px] border border-edge bg-paper-strong">
                <div className="relative grid h-[200px] place-items-center overflow-hidden bg-paper">
                  {project.image_url ? (
                    <img
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
                      src={project.image_url}
                      alt={project.title}
                    />
                  ) : (
                    <div className="font-heading text-sm uppercase tracking-[2px] text-accent-strong">
                      {project.title.split(' ').slice(0, 2).join(' ')}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="tag">{project.tag || 'Project'}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="my-4 flex flex-wrap gap-2">
                    {(project.tech_stack || []).map((tech) => (
                      <span key={tech} className="rounded-full bg-paper-strong px-2.5 py-1.5 text-[12px]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 font-semibold text-accent-strong max-[560px]:flex-col">
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
