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
    <div className="page">
      <header className="page-hero">
        <p className="section-eyebrow">Blog</p>
        <h1>Notes on engineering, product design, and delivery.</h1>
        <p className="lead">
          Short, practical insights from shipping real projects.
        </p>
      </header>

      <section className="page-section">
        {!categories.length && !fallbackCategories.length && hasError ? (
          <div className="card">
            <p>Blog posts are unavailable right now. Please try again later.</p>
          </div>
        ) : (
          <div className="blog-groups">
            {(categories.length ? categories : fallbackCategories)
              .filter((category) => category.posts && category.posts.length > 0)
              .map((category) => (
                <div key={category.slug} className="category-block">
                  <div className="category-header">
                    <h2>{category.name}</h2>
                    <span className="category-count">{category.posts.length} posts</span>
                  </div>
                  <div className="grid-3">
                    {category.posts.map((post) => (
                      <article key={post.slug} className="card blog-card">
                        <p className="tag">{category.name}</p>
                        <h3>{post.title}</h3>
                        <p>{getExcerpt(post)}</p>
                        <div className="card-meta">
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
