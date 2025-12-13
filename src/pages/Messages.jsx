import { useState } from 'react';
import '../styling/aboutnova.module.css';

const Messages = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Here you would send the form data to your backend or service
    setSubmitted(true);
  };

  return (
    <div className="about-nova-page-container">
      <h1 className="about-header">Send Us a Message</h1>
      {submitted ? (
        <p>Thank you for your message! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 400 }}>
          <label htmlFor="name">Nickname</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: 5, border: '1px solid #123499' }}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: 5, border: '1px solid #123499' }}
          />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: 5, border: '1px solid #123499' }}
          />
          <button type="submit" className="back-home-button">Send</button>
        </form>
      )}
    </div>
  );
};

export default Messages;
