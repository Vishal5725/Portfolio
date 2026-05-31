import React from 'react';
import './About.css';

export default function About({ profile, certifications }) {
  const info = [
    { k:'Name',     v: profile?.name     || 'Vishal Gupta' },
    { k:'Role',     v:'Backend Developer' },
    { k:'Email',    v: profile?.email    || 'vg016600@gmail.com' },
    { k:'Phone',    v: profile?.phone    || '+91 88405 58318' },
    { k:'Location', v: profile?.location || 'Lucknow, UP, India' },
    { k:'Status',   v: profile?.is_available ? '🟢 Available' : '🔴 Unavailable' },
  ];

  return (
    <section className="about section-pad" id="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__left">
            <p className="sec-label">About Me</p>
            <h2 className="sec-title">Passionate about<br /><span className="hi">Backend Engineering</span></h2>
            <div className="sec-line" />
            <p className="about__bio">{profile?.summary || "Python Backend Developer specialising in Django, DRF & REST APIs."}</p>
            <p className="about__bio">With two internships (6 months each) and multiple deployed projects, I bring hands-on expertise in REST API design, database optimisation, JWT authentication, and clean-code practices. Currently pursuing B.Tech in CSE while actively building real-world solutions.</p>

            <div className="about__info">
              {info.map((i,k) => (
                <div className="about__info-row" key={k}>
                  <span className="about__info-k">{i.k}</span>
                  <span className="about__info-v">{i.v}</span>
                </div>
              ))}
            </div>

            <div className="about__acts">
              <a href="#contact" className="btn btn-primary">Get in Touch</a>
              <a href={profile?.github||'https://github.com/Vishal5725'} target="_blank" rel="noreferrer" className="btn btn-outline">GitHub</a>
              <a href={profile?.linkedin||'#'} target="_blank" rel="noreferrer" className="btn btn-ghost">LinkedIn</a>
            </div>
          </div>

          <div className="about__right">
            <div className="about__card">
              <h3 className="about__card-h"><span>🎓</span>Certifications & Training</h3>
              {(certifications||[]).map(c => (
                <div className="about__cert" key={c.id}>
                  <span className="about__cert-tick">✔</span>
                  <div>
                    <span className="about__cert-title">{c.title}</span>
                    <span className="about__cert-sub">{c.issuer} · {c.year}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="about__card about__card--glow">
              <h3 className="about__card-h"><span>⚡</span>Quick Facts</h3>
              {['2× Backend Developer Internships (1 year total)','5+ Deployed Production Projects','Strong in Django REST Framework & APIs','JWT Auth & Role-Based Access Control','Open to Remote & Hybrid Roles'].map((f,i)=>(
                <div className="about__fact" key={i}>
                  <span className="about__fact-dot" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
