import React, { useState } from 'react';
import { sendMessage } from '../hooks/useApi';
import './Contact.css';

export default function Contact({ profile }) {
  const [form,   setForm  ] = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      await sendMessage(form);
      setStatus('success');
      setForm({ name:'', email:'', subject:'', message:'' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const contacts = [
    { icon:'📧', label:'Email',            val: profile?.email    || 'vg016600@gmail.com',  href:`mailto:${profile?.email||'vg016600@gmail.com'}` },
    { icon:'📱', label:'Phone / WhatsApp', val: profile?.phone    || '+91 88405 58318',       href:`https://wa.me/${(profile?.whatsapp||'918840558318').replace(/\D/g,'')}` },
    { icon:'📍', label:'Location',         val: profile?.location || 'Lucknow, UP, India',    href: null },
    { icon:'🌐', label:'Portfolio API',    val:'vish22portfolio.pythonanywhere.com',            href: profile?.portfolio_url||'https://vish22portfolio.pythonanywhere.com/api/portfolio/' },
  ];

  const socials = [
    { label:'GitHub',   href: profile?.github  ||'https://github.com/Vishal5725',           icon:<GH/> },
    { label:'LinkedIn', href: profile?.linkedin||'https://linkedin.com/in/vgpython884055', icon:<LI/> },
  ];

  return (
    <section className="contact section-pad" id="contact">
      <div className="container">
        <p className="sec-label">Get in Touch</p>
        <h2 className="sec-title">Let's <span className="hi">Work Together</span></h2>
        <div className="sec-line" />

        <div className="contact__grid">
          {/* ── Left ── */}
          <div className="contact__left">
            <p className="contact__intro">
              I'm actively looking for Backend Developer roles and internship opportunities.
              Whether you have a project, a job offer, or just want to connect — I'd love to hear from you!
            </p>

            <div className="contact__items">
              {contacts.map((c, i) => (
                <div className="contact__item" key={i}>
                  <span className="contact__item-icon">{c.icon}</span>
                  <div>
                    <span className="contact__item-lbl">{c.label}</span>
                    {c.href
                      ? <a href={c.href} target="_blank" rel="noreferrer" className="contact__item-val contact__item-link">{c.val}</a>
                      : <span className="contact__item-val">{c.val}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="contact__socials">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="contact__social">
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right — form ── */}
          <form className="contact__form" onSubmit={submit}>
            <div className="contact__row">
              <Field label="Your Name"  name="name"  type="text"  value={form.name}  onChange={handle} placeholder="John Doe"        required />
              <Field label="Your Email" name="email" type="email" value={form.email} onChange={handle} placeholder="you@email.com"   required />
            </div>
            <Field label="Subject" name="subject" type="text" value={form.subject} onChange={handle} placeholder="Job Opportunity / Project Idea" required />
            <div className="contact__field">
              <label className="contact__label">Message</label>
              <textarea name="message" value={form.message} onChange={handle}
                className="contact__input contact__textarea"
                placeholder="Tell me about your project or opportunity…"
                rows="5" required />
            </div>

            <button type="submit" className="btn btn-primary contact__submit"
              disabled={status === 'loading'}>
              {status === 'loading' && <span className="contact__spin" />}
              {status === 'success' ? '✅ Message Sent!'
               : status === 'error' ? '❌ Failed — Try Again'
               : status === 'loading' ? 'Sending…'
               : <>Send Message <Arrow /></>}
            </button>

            {status === 'success' && (
              <p className="contact__feedback contact__feedback--ok">
                ✔ Message saved! Vishal will get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="contact__feedback contact__feedback--err">
                Backend offline — try emailing directly at vg016600@gmail.com
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type, value, onChange, placeholder, required }) {
  return (
    <div className="contact__field">
      <label className="contact__label">{label}</label>
      <input name={name} type={type} value={value} onChange={onChange}
        className="contact__input" placeholder={placeholder} required={required} />
    </div>
  );
}
const Arrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const GH = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"/></svg>
);
const LI = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);
