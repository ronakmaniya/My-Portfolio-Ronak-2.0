import siteData from '../data/siteData.json'

const iconMap = {
  GitHub: (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.38-3.37-1.38-.46-1.2-1.12-1.52-1.12-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.55-1.15-4.55-5.1 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.1 9.1 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.77 0 3.96-2.34 4.83-4.57 5.08.36.32.69.95.69 1.92 0 1.38-.01 2.5-.01 2.84 0 .26.18.58.69.48A10.08 10.08 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  ),
  LinkedIn: (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.1 1 2.5 1 4.98 2.12 4.98 3.5zM0.4 8.3h4.2V23H0.4zM8.2 8.3h4v2h.1c.6-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.9 5.2 6.7V23h-4.2v-6.6c0-1.6 0-3.6-2.2-3.6-2.2 0-2.5 1.7-2.5 3.5V23H8.2z" />
    </svg>
  ),
  Email: (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v.5l8 5 8-5V7H4zm0 2.9V17h16V9.9l-7.4 4.6a1 1 0 0 1-1.2 0L4 9.9z" />
    </svg>
  ),
}

function Footer() {
  const { name, title, social, footer } = siteData
  const footerYear = footer?.year || new Date().getFullYear()
  const copyrightName = footer?.copyrightName || name

  return (
    <footer className="flex flex-col gap-5 border-t border-edge py-7 pb-9">
      <div className="flex flex-wrap items-center justify-between gap-4 max-[720px]:items-start">
        <div className="flex flex-col gap-1.5">
          <p className="font-heading text-base text-ink">{name}</p>
          <span className="text-sm text-muted">{title}</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {social.map((link) => (
            <a
              key={link.label}
              className="inline-flex items-center gap-2 rounded-full border border-edge bg-paper-strong px-3 py-2 text-[clamp(0.72rem,0.5vw,0.85rem)] text-ink-soft transition hover:-translate-y-0.5 hover:border-accent"
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              {iconMap[link.label]}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-3 text-center text-[clamp(0.7rem,0.5vw,0.8rem)] text-muted max-[720px]:flex-col max-[720px]:text-left">
        <span>{footer?.tagline}</span>
        <span className="flex-1">© {footerYear} {copyrightName}. All rights reserved.</span>
        <span>{footer?.techNote}</span>
      </div>
    </footer>
  )
}

export default Footer
