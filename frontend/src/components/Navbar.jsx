import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import siteData from '../data/siteData.json'

const iconMap = {
  GitHub: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.38-3.37-1.38-.46-1.2-1.12-1.52-1.12-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.55-1.15-4.55-5.1 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.1 9.1 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.77 0 3.96-2.34 4.83-4.57 5.08.36.32.69.95.69 1.92 0 1.38-.01 2.5-.01 2.84 0 .26.18.58.69.48A10.08 10.08 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.1 1 2.5 1 4.98 2.12 4.98 3.5zM0.4 8.3h4.2V23H0.4zM8.2 8.3h4v2h.1c.6-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.9 5.2 6.7V23h-4.2v-6.6c0-1.6 0-3.6-2.2-3.6-2.2 0-2.5 1.7-2.5 3.5V23H8.2z" />
    </svg>
  ),
}

function Navbar({ theme, onToggleTheme }) {
  const { name, resumeUrl, social } = siteData
  const navSocial = social.filter((item) => item.label === 'GitHub' || item.label === 'LinkedIn')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navLinkBase =
    'inline-flex items-center rounded-full border border-transparent px-3.5 py-2.5 text-ink-soft transition-all hover:border-accent hover:bg-paper hover:text-ink max-[1024px]:px-3 max-[1024px]:py-2 max-[560px]:w-full max-[560px]:justify-between max-[560px]:border max-[560px]:border-edge max-[560px]:bg-paper-strong max-[560px]:px-3 max-[560px]:py-2 max-[560px]:text-[13px] max-[560px]:tracking-[0.8px]'

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="sticky top-2 z-10 flex flex-wrap items-center justify-between gap-6 rounded-[32px] border border-edge bg-glass px-8 py-5 shadow-soft backdrop-blur max-[1024px]:flex-col max-[1024px]:items-stretch max-[1024px]:gap-3 max-[1024px]:rounded-[22px] max-[1024px]:px-4 max-[1024px]:py-3 max-[560px]:rounded-[18px] max-[560px]:px-3 max-[560px]:py-2">
      <div className="flex items-center justify-between gap-3 max-[560px]:w-full">
        <div className="font-heading text-[22px] font-bold tracking-[0.2px] text-ink max-[560px]:text-[20px]">{name}</div>
        <button
          className="hidden items-center gap-2 rounded-full border border-edge bg-paper-strong px-3 py-2 text-[12px] uppercase tracking-[1.4px] text-ink transition hover:-translate-y-0.5 hover:border-accent max-[1024px]:inline-flex"
          type="button"
          onClick={handleToggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
        >
          <span className="sr-only">Menu</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <div
        id="primary-navigation"
        className={`flex flex-wrap gap-3 rounded-full border border-transparent bg-transparent px-0 py-0 text-[15px] uppercase tracking-[1px] max-[1024px]:flex-col max-[1024px]:items-stretch max-[1024px]:gap-2 max-[1024px]:w-full max-[1024px]:justify-start max-[1024px]:rounded-[20px] max-[1024px]:border-edge max-[1024px]:bg-paper-strong max-[1024px]:px-3 max-[1024px]:py-2 max-[560px]:rounded-[18px] max-[560px]:p-2 ${
          isMenuOpen ? 'max-[1024px]:flex' : 'max-[1024px]:hidden'
        }`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${navLinkBase} border-accent bg-paper text-ink` : navLinkBase
          }
          onClick={handleNavClick}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? `${navLinkBase} border-accent bg-paper text-ink` : navLinkBase
          }
          onClick={handleNavClick}
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? `${navLinkBase} border-accent bg-paper text-ink` : navLinkBase
          }
          onClick={handleNavClick}
        >
          Projects
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive ? `${navLinkBase} border-accent bg-paper text-ink` : navLinkBase
          }
          onClick={handleNavClick}
        >
          Blog
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? `${navLinkBase} border-accent bg-paper text-ink` : navLinkBase
          }
          onClick={handleNavClick}
        >
          Contact
        </NavLink>
      </div>
      <div className="flex items-center gap-3 max-[1024px]:w-full max-[1024px]:justify-between max-[1024px]:flex-wrap max-[640px]:flex-col max-[640px]:items-stretch">
        <div className="flex items-center gap-2.5">
          {navSocial.map((link) => (
            <a key={link.label} className="icon-button" href={link.url} target="_blank" rel="noreferrer">
              {iconMap[link.label]}
              <span className="sr-only">{link.label}</span>
            </a>
          ))}
          <button className="icon-button" type="button" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 3.5v3M12 17.5v3M20.5 12h-3M6.5 12h-3M18.1 5.9l-2.1 2.1M8 16l-2.1 2.1M18.1 18.1 16 16M8 8 5.9 5.9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5z" />
              </svg>
            )}
          </button>
        </div>
        <a
          className="btn btn-ghost max-[1024px]:flex-1 max-[1024px]:justify-center max-[640px]:w-full"
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
        >
          Resume
        </a>
      </div>
    </nav>
  )
}

export default Navbar
