import siteData from '../data/siteData.json'

function About() {
  const { summary, highlights, experience, education, skills, stats } = siteData

  return (
    <div className="flex flex-col gap-7 pb-4 pt-2">
      <header className="rounded-[24px] border border-edge bg-paper-strong p-8 shadow-soft max-[720px]:p-6">
        <p className="mb-2 text-[12px] uppercase tracking-[2px] text-accent-strong">About</p>
        <h1 className="text-[clamp(2.4rem,3.5vw,3.6rem)] leading-[1.15]">Product-focused developer with a calm execution style.</h1>
        <p className="text-[1.05rem] text-ink-soft max-w-[540px]">{summary}</p>
      </header>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="card flex flex-col gap-3">
          <h2>Highlights</h2>
          <p className="text-muted">How I like to collaborate and deliver.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <span key={item} className="pill">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="card flex flex-col gap-3">
          <h2>Track record</h2>
          <p className="text-muted">A quick snapshot of recent outcomes.</p>
          <div className="mt-2 grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="stat">
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-[13px] text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <div>
          <p className="mb-2 text-[12px] uppercase tracking-[2px] text-accent-strong">Skills</p>
          <h2 className="text-[clamp(1.8rem,2.6vw,2.4rem)] leading-tight">Core skills and trusted tools.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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

      <section className="flex flex-col gap-5">
        <div>
          <p className="mb-2 text-[12px] uppercase tracking-[2px] text-accent-strong">Experience</p>
          <h2 className="text-[clamp(1.8rem,2.6vw,2.4rem)] leading-tight">Teams, timelines, and outcomes.</h2>
        </div>
        <div className="flex flex-col gap-6">
          {experience.map((role) => (
            <div key={role.company} className="rounded-[18px] border border-edge bg-paper-strong p-5">
              <div>
                <h3>{role.role}</h3>
                <p className="text-muted">{role.company}</p>
              </div>
              <p className="text-[13px] text-muted">{role.period}</p>
              <ul className="mt-3 list-disc pl-5 text-muted">
                {role.details.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <div>
          <p className="mb-2 text-[12px] uppercase tracking-[2px] text-accent-strong">Education</p>
          <h2 className="text-[clamp(1.8rem,2.6vw,2.4rem)] leading-tight">Foundations and formal learning.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {education.map((item) => (
            <div key={item.school} className="card">
              <h3>{item.degree}</h3>
              <p className="text-muted">{item.school}</p>
              <p className="text-[13px] text-muted">{item.period}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
