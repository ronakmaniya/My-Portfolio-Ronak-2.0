import siteData from '../data/siteData.json'

function About() {
  const { summary, highlights, experience, education, skills } = siteData

  return (
    <div className="page">
      <header className="page-hero">
        <p className="section-eyebrow">About</p>
        <h1>Product-focused developer with a calm execution style.</h1>
        <p className="lead">{summary}</p>
      </header>

      <section className="page-section">
        <h2>Highlights</h2>
        <div className="pill-row">
          {highlights.map((item) => (
            <span key={item} className="pill">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="page-section">
        <h2>Core skills</h2>
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
        <h2>Experience</h2>
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
        <h2>Education</h2>
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
