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

const getExcerpt = (post) => {
  if (post.excerpt) {
    return post.excerpt
  }
  if (!post.content) {
    return 'Read the full article for details.'
  }
  const collapsed = post.content.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()
  if (!collapsed) {
    return 'Read the full article for details.'
  }
  return collapsed.length > 140 ? `${collapsed.slice(0, 140).trim()}...` : collapsed
}

const getDateLabel = (post) => post.date || post.created_at?.slice(0, 10) || ''

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

  const fallbackProjects = ENABLE_FALLBACK ? pickFeaturedProjects(featuredProjects) : []
  const fallbackPosts = ENABLE_FALLBACK ? blogPosts.slice(0, 3) : []

  const [projectItems, setProjectItems] = useState([])
  const [postItems, setPostItems] = useState([])
  const [errors, setErrors] = useState({ projects: false, posts: false })

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        const featured = pickFeaturedProjects(data)
        if (featured.length) {
          setProjectItems(featured)
          return
        }
        if (ENABLE_FALLBACK && featuredProjects.length) {
          setProjectItems(pickFeaturedProjects(featuredProjects))
        }
      })
      .catch(() => {
        if (ENABLE_FALLBACK && featuredProjects.length) {
          setProjectItems(pickFeaturedProjects(featuredProjects))
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
        if (posts.length) {
          setPostItems(posts.slice(0, 3))
          return
        }
        if (ENABLE_FALLBACK && blogPosts.length) {
          setPostItems(blogPosts.slice(0, 3))
        }
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
    <div className="flex flex-col gap-7 pb-4 pt-2">
      <header className="py-12 pb-4">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="reveal flex flex-col gap-4" style={{ '--delay': '0.1s' }}>
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-soft px-2.5 py-1 text-[12px] uppercase tracking-[1.6px] text-accent-strong">
              {availability}
            </p>
            <h1 className="flex flex-col gap-3 font-heading text-[clamp(2.9rem,4.6vw,4.8rem)] leading-[1.05] text-ink max-[720px]:text-[clamp(2.4rem,8vw,3.2rem)]">
              {name}
              <span className="text-[clamp(1.4rem,2vw,2rem)] font-normal text-muted">{title}</span>
            </h1>
            <p className="text-[1.05rem] text-ink-soft max-w-[540px]">{intro}</p>
            <div className="my-4 flex flex-wrap gap-4 max-[560px]:flex-col max-[560px]:items-stretch">
              <Link className="btn btn-primary max-[560px]:w-full max-[560px]:justify-center" to="/contact">
                Lets talk
              </Link>
              <Link className="btn btn-ghost max-[560px]:w-full max-[560px]:justify-center" to="/projects">
                View projects
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted">
              <span>{location}</span>
              <span>{contact.email}</span>
            </div>
          </div>

          <div className="reveal rounded-[28px] border border-edge bg-paper-strong p-7 shadow-soft max-[720px]:p-6" style={{ '--delay': '0.25s' }}>
            <div
              className="mb-5 grid h-[120px] w-[120px] place-items-center rounded-[32px] bg-[linear-gradient(140deg,#f0c7b4,#d7e2df)] text-3xl font-bold text-accent-strong"
              aria-hidden="true"
            >
              <span>{initialsFromName(name)}</span>
            </div>
            <div className="mb-5 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="stat">
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-[13px] text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {highlights.map((item) => (
                <span key={item} className="rounded-full bg-paper-strong px-2.5 py-1.5 text-[12px]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="reveal grid gap-9 border-t border-edge py-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]" style={{ '--delay': '0.1s' }}>
        <div className="lg:sticky lg:top-6">
          <p className="mb-2 text-[12px] uppercase tracking-[2px] text-accent-strong">About</p>
          <h2 className="text-[clamp(1.8rem,2.6vw,2.4rem)] leading-tight">Building digital products with a strong engineering core.</h2>
        </div>
        <div>
          <p>{summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <span key={item} className="pill">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal grid gap-9 border-t border-edge py-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]" style={{ '--delay': '0.15s' }}>
        <div className="lg:sticky lg:top-6">
          <p className="mb-2 text-[12px] uppercase tracking-[2px] text-accent-strong">Skills</p>
          <h2 className="text-[clamp(1.8rem,2.6vw,2.4rem)] leading-tight">Focused on modern stacks and dependable delivery.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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

      <section className="reveal grid gap-9 border-t border-edge py-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]" style={{ '--delay': '0.2s' }}>
        <div className="lg:sticky lg:top-6">
          <p className="mb-2 text-[12px] uppercase tracking-[2px] text-accent-strong">Services</p>
          <h2 className="text-[clamp(1.8rem,2.6vw,2.4rem)] leading-tight">What I build for teams and startups.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="card card-accent">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal grid gap-9 border-t border-edge py-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]" style={{ '--delay': '0.2s' }}>
        <div className="lg:sticky lg:top-6">
          <p className="mb-2 text-[12px] uppercase tracking-[2px] text-accent-strong">Featured Projects</p>
          <h2 className="text-[clamp(1.8rem,2.6vw,2.4rem)] leading-tight">Proof of craft with real-world outcomes.</h2>
        </div>
        {!projectItems.length && !fallbackProjects.length && errors.projects ? (
          <div className="card">
            <p>Projects are unavailable right now. Please try again later.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {(projectItems.length ? projectItems : fallbackProjects).map((project) => (
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
                  <p className="tag">{project.tag || 'Featured project'}</p>
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
        <div className="mt-5">
          <Link className="btn btn-ghost" to="/projects">
            View all projects
          </Link>
        </div>
      </section>

      <section className="reveal grid gap-9 border-t border-edge py-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]" style={{ '--delay': '0.25s' }}>
        <div className="lg:sticky lg:top-6">
          <p className="mb-2 text-[12px] uppercase tracking-[2px] text-accent-strong">Writing</p>
          <h2 className="text-[clamp(1.8rem,2.6vw,2.4rem)] leading-tight">Latest notes on product engineering.</h2>
        </div>
        {!postItems.length && !fallbackPosts.length && errors.posts ? (
          <div className="card">
            <p>Blog posts are unavailable right now. Please try again later.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {(postItems.length ? postItems : fallbackPosts).map((post) => (
              <article key={post.slug} className="card">
                <p className="tag">{post.category || 'Writing'}</p>
                <h3>{post.title}</h3>
                <p>{getExcerpt(post)}</p>
                <div className="flex items-center justify-between gap-2 text-[12px] text-muted max-[720px]:flex-col max-[720px]:items-start">
                  <span>{getDateLabel(post)}</span>
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
