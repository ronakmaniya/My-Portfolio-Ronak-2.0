import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="page">
      <header className="page-hero">
        <p className="section-eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="lead">The page you are looking for does not exist.</p>
      </header>
      <Link className="btn ghost" to="/">
        Go back home
      </Link>
    </div>
  )
}

export default NotFound
