import { useState } from 'react'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState(null)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function validate() {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    return newErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setStatus(null)
      return
    }

    setErrors({})
    setSubmitting(true)
    setStatus(null)

    try {
      const res = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error('Failed to send message')

      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="contact-shell">
      <div className="contact-panel">
        <h3>Let&apos;s connect</h3>
        <p>Open to freelance work, internships, and meaningful side projects.</p>
        <ul className="contact-list">
          <li>Available for remote collaboration</li>
          <li>Replies usually within 1–2 days</li>
          <li>Happy to help with web apps and portfolios</li>
        </ul>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" name="subject" placeholder="What are you working on?" value={formData.subject} onChange={handleChange} />
          {errors.subject && <p className="form-error">{errors.subject}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" placeholder="Tell me a bit about your idea..." value={formData.message} onChange={handleChange} />
          {errors.message && <p className="form-error">{errors.message}</p>}
        </div>

        <button type="submit" className="cta-button contact-submit" disabled={submitting}>
          {submitting ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && <p className="form-status success">Message sent successfully.</p>}
        {status === 'error' && <p className="form-status error">Something went wrong. Please try again.</p>}
      </form>
    </div>
  )
}

export default ContactForm