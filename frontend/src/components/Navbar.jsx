import { NavLink } from 'react-router-dom'
import siteData from '../data/siteData.json'

function Navbar() {
  const { name, resumeUrl } = siteData

  return (
    <nav className="nav">
      <div className="logo">{name}</div>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Projects
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Blog
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Contact
        </NavLink>
      </div>
      <a className="btn ghost" href={resumeUrl} target="_blank" rel="noreferrer">
        Resume
      </a>
    </nav>
  )
}

export default Navbar
