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

const getReadTime = (post) => {
  if (!post.content) {
    return null
  }
  const words = post.content.trim().split(/\s+/).filter(Boolean).length
  if (!words) {
    return null
  }
  const minutes = Math.max(1, Math.round(words / 220))
  return `${minutes} min read`
}

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
      <div className="flex flex-col gap-7 pb-4 pt-2">
        <header className="rounded-[24px] border border-edge bg-paper-strong p-8 shadow-soft max-[720px]:p-6">
          <p className="mb-2 text-[12px] uppercase tracking-[2px] text-accent-strong">Blog</p>
          <h1 className="text-[clamp(2.4rem,3.5vw,3.6rem)] leading-[1.15]">Unable to load post</h1>
          <p className="text-[1.05rem] text-ink-soft max-w-[540px]">Please try again later.</p>
        </header>
        <Link className="btn btn-ghost" to="/blog">
          Back to blog
        </Link>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex flex-col gap-7 pb-4 pt-2">
        <header className="rounded-[24px] border border-edge bg-paper-strong p-8 shadow-soft max-[720px]:p-6">
          <p className="mb-2 text-[12px] uppercase tracking-[2px] text-accent-strong">Blog</p>
          <h1 className="text-[clamp(2.4rem,3.5vw,3.6rem)] leading-[1.15]">Post not found</h1>
          <p className="text-[1.05rem] text-ink-soft max-w-[540px]">The article you are looking for is not available yet.</p>
        </header>
        <Link className="btn btn-ghost" to="/blog">
          Back to blog
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-7 pb-4 pt-2">
      <header className="rounded-[24px] border border-edge bg-paper-strong p-8 shadow-soft max-[720px]:p-6">
        <p className="mb-2 text-[12px] uppercase tracking-[2px] text-accent-strong">{formatCategory(post.category)}</p>
        <h1 className="text-[clamp(2.4rem,3.5vw,3.6rem)] leading-[1.15]">{post.title}</h1>
        <p className="text-[1.05rem] text-ink-soft max-w-[540px]">{getExcerpt(post)}</p>
        <div className="flex flex-wrap gap-4 text-[13px]">
          <span className="text-muted">{getDateLabel(post)}</span>
          {getReadTime(post) ? <span className="text-muted">{getReadTime(post)}</span> : null}
        </div>
      </header>

      <section className="flex flex-col gap-5">
        <div className="card markdown-content max-w-[820px]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content ? post.content.replace(/\\n/g, '\n') : ''}
          </ReactMarkdown>
        </div>
        <div className="mt-5">
          <Link className="btn btn-ghost" to="/blog">
            Back to blog
          </Link>
        </div>
      </section>
    </div>
  )
}

export default BlogDetail
