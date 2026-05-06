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
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              <span>{contact.location}</span>
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
