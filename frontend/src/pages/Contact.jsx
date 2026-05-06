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
    <div className="page">
      <header className="page-hero">
        <p className="section-eyebrow">Contact</p>
        <h1>Lets build something meaningful together.</h1>
        <p className="lead">{contact.cta}</p>
      </header>

      <section className="page-section">
        <div className="contact-grid">
          <div>
            <h3>Reach me directly</h3>
            <div className="contact-list">
              <a className="contact-item" href={`mailto:${contact.email}`}>
                <span className="icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v.5l8 5 8-5V7H4zm0 2.9V17h16V9.9l-7.4 4.6a1 1 0 0 1-1.2 0L4 9.9z" />
                  </svg>
                </span>
                {contact.email}
              </a>
              <a className="contact-item" href={`tel:${contact.phone}`}>
                <span className="icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.6 3.4 9.2 2c.3-.2.7-.1.9.2l2 3.5c.2.3.1.7-.2.9l-1.8 1.1a14 14 0 0 0 6.6 6.6l1.1-1.8c.2-.3.6-.4.9-.2l3.5 2c.3.2.4.6.2.9l-1.4 2.6c-.2.3-.5.5-.9.5-9.2 0-16.6-7.4-16.6-16.6 0-.4.2-.7.5-.9z" />
                  </svg>
                </span>
                {contact.phone}
              </a>
              <span className="contact-item">
                <span className="icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7zm0 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                  </svg>
                </span>
                {contact.location}
              </span>
            </div>
          </div>
          <div className="card">
            <h3>Quick note</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                value={formState.name}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={formState.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Tell me about your project"
                value={formState.message}
                onChange={handleChange}
                required
              />
              {status.message ? (
                <p className={`status ${status.state}`}>{status.message}</p>
              ) : null}
              <button className="btn primary" type="submit" disabled={status.state === 'loading'}>
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
