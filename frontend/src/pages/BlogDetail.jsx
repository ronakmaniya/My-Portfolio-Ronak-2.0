import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import siteData from '../data/siteData.json'
import { ENABLE_FALLBACK, fetchPostBySlug } from '../services/api.js'

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
        <p className="section-eyebrow">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="lead">{post.excerpt}</p>
        <span className="muted">{post.date}</span>
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
