import siteData from '../data/siteData.json'

function About() {
  const { summary, highlights, experience, education, skills, stats } = siteData

  return (
    <div className="page">
      <header className="page-hero">
        <p className="section-eyebrow">About</p>
        <h1>Product-focused developer with a calm execution style.</h1>
        <p className="lead">{summary}</p>
      </header>

      <section className="page-section about-grid">
        <div className="card about-panel">
          <h2>Highlights</h2>
          <p className="muted">How I like to collaborate and deliver.</p>
          <div className="pill-row">
            {highlights.map((item) => (
              <span key={item} className="pill">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="card about-panel">
          <h2>Track record</h2>
          <p className="muted">A quick snapshot of recent outcomes.</p>
          <div className="stat-grid about-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="stat">
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <p className="section-eyebrow">Skills</p>
          <h2>Core skills and trusted tools.</h2>
        </div>
        <div className="grid-3">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="card">
              <h3>{group}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <p className="section-eyebrow">Experience</p>
          <h2>Teams, timelines, and outcomes.</h2>
        </div>
        <div className="timeline">
          {experience.map((role) => (
            <div key={role.company} className="timeline-item">
              <div>
                <h3>{role.role}</h3>
                <p className="muted">{role.company}</p>
              </div>
              <p className="period">{role.period}</p>
              <ul>
                {role.details.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <p className="section-eyebrow">Education</p>
          <h2>Foundations and formal learning.</h2>
        </div>
        <div className="grid-2">
          {education.map((item) => (
            <div key={item.school} className="card">
              <h3>{item.degree}</h3>
              <p className="muted">{item.school}</p>
              <p className="period">{item.period}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
