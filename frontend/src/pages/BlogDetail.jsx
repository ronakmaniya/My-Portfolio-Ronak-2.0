import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import siteData from '../data/siteData.json'
import { ENABLE_FALLBACK, fetchPostBySlug } from '../services/api.js'

const getExcerpt = (post) => {
  if (post.excerpt) {
    return post.excerpt
  }
  if (!post.content) {
    return ''
  }
  const collapsed = post.content.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()
  if (!collapsed) {
    return ''
  }
  return collapsed.length > 160 ? `${collapsed.slice(0, 160).trim()}...` : collapsed
}

const getDateLabel = (post) => post.date || post.created_at?.slice(0, 10) || ''

const formatCategory = (category) => {
  if (!category) {
    return 'Blog'
  }
  return category
    .split('-')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ')
}

function BlogDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    fetchPostBySlug(slug)
      .then((data) => {
        setPost(data)
      })
      .catch(() => {
        if (ENABLE_FALLBACK && siteData.blogPosts?.length) {
          const fallbackPost = siteData.blogPosts.find((item) => item.slug === slug)
          if (fallbackPost) {
            setPost(fallbackPost)
            return
          }
        }
        setHasError(true)
      })
  }, [slug])

  if (hasError) {
    return (
      <div className="page">
        <header className="page-hero">
          <p className="section-eyebrow">Blog</p>
          <h1>Unable to load post</h1>
          <p className="lead">Please try again later.</p>
        </header>
        <Link className="btn ghost" to="/blog">
          Back to blog
        </Link>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="page">
        <header className="page-hero">
          <p className="section-eyebrow">Blog</p>
          <h1>Post not found</h1>
          <p className="lead">The article you are looking for is not available yet.</p>
        </header>
        <Link className="btn ghost" to="/blog">
          Back to blog
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <header className="page-hero">
        <p className="section-eyebrow">{formatCategory(post.category)}</p>
        <h1>{post.title}</h1>
        <p className="lead">{getExcerpt(post)}</p>
        <span className="muted">{getDateLabel(post)}</span>
      </header>

      <section className="page-section">
        <div className="card markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content ? post.content.replace(/\\n/g, '\n') : ''}
          </ReactMarkdown>
        </div>
        <div className="section-cta">
          <Link className="btn ghost" to="/blog">
            Back to blog
          </Link>
        </div>
      </section>
    </div>
  )
}

export default BlogDetail
