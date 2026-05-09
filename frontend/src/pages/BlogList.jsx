import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import siteData from '../data/siteData.json'
import { ENABLE_FALLBACK, fetchPostsByCategory } from '../services/api.js'

const groupPostsByCategory = (posts) => {
  const grouped = posts.reduce((acc, post) => {
    const name = post.category || 'General'
    if (!acc[name]) {
      acc[name] = {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        posts: [],
      }
    }
    acc[name].posts.push(post)
    return acc
  }, {})

  return Object.values(grouped)
}

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

function BlogList() {
  const [categories, setCategories] = useState([])
  const [hasError, setHasError] = useState(false)
  const fallbackCategories = ENABLE_FALLBACK && siteData.blogPosts?.length
    ? groupPostsByCategory(siteData.blogPosts)
    : []

  useEffect(() => {
    fetchPostsByCategory()
      .then((data) => {
        if (data.categories?.length) {
          setCategories(data.categories)
          return
        }
        if (ENABLE_FALLBACK && siteData.blogPosts?.length) {
          setCategories(groupPostsByCategory(siteData.blogPosts))
        }
      })
      .catch(() => {
        if (ENABLE_FALLBACK && siteData.blogPosts?.length) {
          setCategories(groupPostsByCategory(siteData.blogPosts))
          return
        }
        setHasError(true)
      })
  }, [])

  return (
    <div className="flex flex-col gap-7 pb-4 pt-2">
      <header className="rounded-[24px] border border-edge bg-paper-strong p-8 shadow-soft max-[720px]:p-6">
        <p className="mb-2 text-[clamp(0.65rem,0.5vw,0.75rem)] uppercase tracking-[2px] text-accent-strong">Blog</p>
        <h1 className="text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.15]">Notes on engineering, product design, and delivery.</h1>
        <p className="text-[clamp(0.98rem,0.6vw,1.08rem)] text-ink-soft max-w-[540px]">
          Short, practical insights from shipping real projects.
        </p>
      </header>

      <section className="flex flex-col gap-5">
        {!categories.length && !fallbackCategories.length && hasError ? (
          <div className="card">
            <p>Blog posts are unavailable right now. Please try again later.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {(categories.length ? categories : fallbackCategories)
              .filter((category) => category.posts && category.posts.length > 0)
              .map((category) => (
                <div key={category.slug}>
                  <div className="mb-4 flex items-baseline justify-between gap-3 max-[640px]:flex-col max-[640px]:items-start">
                    <h2>{category.name}</h2>
                    <span className="text-[12px] uppercase tracking-[1.4px] text-muted">
                      {category.posts.length} posts
                    </span>
                  </div>
                  <div className="grid gap-5 max-[640px]:gap-7 md:grid-cols-2 lg:grid-cols-3">
                    {category.posts.map((post) => (
                      <article key={post.slug} className="card flex flex-col gap-2">
                        <p className="tag">{category.name}</p>
                        <h3>{post.title}</h3>
                        <p className="line-clamp-3">{getExcerpt(post)}</p>
                        <div className="flex items-center justify-between gap-2 text-[12px] text-muted max-[720px]:flex-col max-[720px]:items-start">
                          <span>{getDateLabel(post)}</span>
                          <Link to={`/blog/${post.slug}`}>Read more</Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default BlogList
