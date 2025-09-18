import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Feedback(){
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'student', rating: '5', message: '' });

  function handleChange(e){
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e){
    e.preventDefault();
    // Save to localStorage for demo purposes and log to console
    try{
      const existing = JSON.parse(localStorage.getItem('ecoquest_feedback') || '[]');
      existing.push({ ...formData, createdAt: new Date().toISOString() });
      localStorage.setItem('ecoquest_feedback', JSON.stringify(existing));
    }catch(err){
      console.error('Could not save feedback', err);
    }
    setSubmitted(true);
  }

  return (
    <section className="section">
      <div className="container">
        <span className="badge">✉️ Feedback</span>
        <h1 className="h1 mt-6">Share your feedback</h1>
        <p className="lead">Help us improve EcoQuest. Your input matters—tell us what you like, what could be better, or any feature requests.</p>

        {!submitted ? (
          <form className="card feedback-form mt-12" onSubmit={handleSubmit}>
            <label className="small" htmlFor="name">Your name (optional)</label>
            <input className="input mt-6" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />

            <label className="small mt-10" htmlFor="email">Email (optional)</label>
            <input className="input mt-6" id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />

            <label className="small mt-10" htmlFor="role">I am a</label>
            <select id="role" name="role" className="select mt-6" value={formData.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
              <option value="other">Other</option>
            </select>

            <label className="small mt-10">Overall experience</label>
            <div className="mt-6">
              <select name="rating" className="select" value={formData.rating} onChange={handleChange}>
                <option value="5">5 — Excellent</option>
                <option value="4">4 — Good</option>
                <option value="3">3 — Okay</option>
                <option value="2">2 — Poor</option>
                <option value="1">1 — Very poor</option>
              </select>
            </div>

            <label className="small mt-10" htmlFor="message">Message</label>
            <textarea id="message" name="message" className="input mt-6" rows="6" value={formData.message} onChange={handleChange} placeholder="Tell us what's working well or what we could improve..."></textarea>

            <div className="mt-12 flex gap-8 wrap">
              <button className="btn primary" type="submit">Submit feedback</button>
              <Link className="btn" to="/">Back to home</Link>
            </div>
          </form>
        ) : (
          <div className="card thanks-card mt-12">
            <div className="fw-700">Thank you!</div>
            <div className="small mt-6">We appreciate your feedback. You can edit your submission by visiting the feedback page again.</div>
            <div className="mt-12">
              <Link className="btn" to="/">Return home</Link>
              <Link className="btn ghost ml-6" to="/feedback">Submit another</Link>
            </div>
          </div>
        )}

        <div className="small mt-10">Note: Feedback is stored locally in your browser for this demo. For production, connect a backend or CMS to collect responses.</div>
      </div>
    </section>
  );
}
