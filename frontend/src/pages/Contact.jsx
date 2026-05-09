import { useState } from 'react'
import siteData from '../data/siteData.json'
import { submitContact } from '../services/api.js'

function Contact() {
  const { contact } = siteData
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ state: 'loading', message: '' })

    try {
      await submitContact(formState)
      setStatus({ state: 'success', message: 'Message sent successfully.' })
      setFormState({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus({ state: 'error', message: 'Unable to send message right now.' })
    }
  }

  return (
    <div className="flex flex-col gap-7 pb-4 pt-2">
      <header className="rounded-[24px] border border-edge bg-paper-strong p-8 shadow-soft max-[720px]:p-6">
        <p className="mb-2 text-[clamp(0.65rem,0.5vw,0.75rem)] uppercase tracking-[2px] text-accent-strong">Contact</p>
        <h1 className="text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.15]">Lets build something meaningful together.</h1>
        <p className="text-[clamp(0.98rem,0.6vw,1.08rem)] text-ink-soft max-w-[540px]">{contact.cta}</p>
      </header>

      <section className="flex flex-col gap-5">
        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <h3>Reach me directly</h3>
            <div className="mt-3 flex flex-col gap-2 text-[clamp(0.9rem,0.6vw,1rem)]">
              <a className="inline-flex items-center gap-2.5 text-ink-soft" href={`mailto:${contact.email}`}>
                <span className="grid h-7 w-7 place-items-center rounded-full border border-edge bg-paper-strong">
                  <svg className="h-[14px] w-[14px] fill-ink" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v.5l8 5 8-5V7H4zm0 2.9V17h16V9.9l-7.4 4.6a1 1 0 0 1-1.2 0L4 9.9z" />
                  </svg>
                </span>
                {contact.email}
              </a>
              <a className="inline-flex items-center gap-2.5 text-ink-soft" href={`tel:${contact.phone}`}>
                <span className="grid h-7 w-7 place-items-center rounded-full border border-edge bg-paper-strong">
                  <svg className="h-[14px] w-[14px] fill-ink" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.6 3.4 9.2 2c.3-.2.7-.1.9.2l2 3.5c.2.3.1.7-.2.9l-1.8 1.1a14 14 0 0 0 6.6 6.6l1.1-1.8c.2-.3.6-.4.9-.2l3.5 2c.3.2.4.6.2.9l-1.4 2.6c-.2.3-.5.5-.9.5-9.2 0-16.6-7.4-16.6-16.6 0-.4.2-.7.5-.9z" />
                  </svg>
                </span>
                {contact.phone}
              </a>
              <span className="inline-flex items-center gap-2.5 text-ink-soft">
                <span className="grid h-7 w-7 place-items-center rounded-full border border-edge bg-paper-strong">
                  <svg className="h-[14px] w-[14px] fill-ink" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7zm0 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                  </svg>
                </span>
                {contact.location}
              </span>
            </div>
          </div>
          <div className="card">
            <h3>Quick note</h3>
            <form className="mt-3 grid gap-3" onSubmit={handleSubmit}>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                value={formState.name}
                onChange={handleChange}
                required
                className="rounded-[12px] border border-edge bg-paper px-3 py-2 font-sans text-[clamp(0.9rem,0.6vw,1rem)] text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/20"
              />
              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={formState.email}
                onChange={handleChange}
                required
                className="rounded-[12px] border border-edge bg-paper px-3 py-2 font-sans text-[clamp(0.9rem,0.6vw,1rem)] text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/20"
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Tell me about your project"
                value={formState.message}
                onChange={handleChange}
                required
                className="rounded-[12px] border border-edge bg-paper px-3 py-2 font-sans text-[clamp(0.9rem,0.6vw,1rem)] text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/20"
              />
              {status.message ? (
                <p
                  className={`rounded-[10px] bg-paper-strong px-3 py-2 text-[clamp(0.85rem,0.55vw,0.95rem)] ${
                    status.state === 'success'
                      ? 'text-emerald-700'
                      : status.state === 'error'
                        ? 'text-red-700'
                        : 'text-muted'
                  }`}
                >
                  {status.message}
                </p>
              ) : null}
              <button
                className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-70"
                type="submit"
                disabled={status.state === 'loading'}
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
