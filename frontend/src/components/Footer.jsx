import siteData from '../data/siteData.json'

function Footer() {
  const { name, title, social } = siteData

  return (
    <footer className="footer">
      <div>
        <p>{name}</p>
        <span>{title}</span>
      </div>
      <div className="footer-links">
        {social.map((link) => (
          <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
