import React, { useEffect, useRef } from 'react';
import './Hero.css';

const ROLES = ['Backend Developer','Python Engineer','Django Specialist','REST API Developer','Full-Stack Explorer'];

export default function Hero({ profile }) {
  const typedRef = useRef(null);
  const ri = useRef(0), ci = useRef(0), del = useRef(false);

  useEffect(() => {
    const el = typedRef.current; if (!el) return;
    let t;
    const tick = () => {
      const w = ROLES[ri.current];
      if (!del.current) {
        el.textContent = w.slice(0, ++ci.current);
        if (ci.current === w.length) { del.current=true; t=setTimeout(tick,2000); return; }
      } else {
        el.textContent = w.slice(0, --ci.current);
        if (ci.current === 0) { del.current=false; ri.current=(ri.current+1)%ROLES.length; }
      }
      t = setTimeout(tick, del.current ? 55 : 88);
    };
    t = setTimeout(tick, 700);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { n: profile?.internships_count || 2,  l: 'Internships'   },
    { n: `${profile?.projects_count||5}+`, l: 'Projects'      },
    { n: '12+',                             l: 'Technologies'  },
    { n: '1+',                              l: 'Yrs Experience'},
  ];

  return (
    <section className="hero" id="hero">
      <div className="hero__bg-grid" />
      <div className="hero__orb hero__orb--a" />
      <div className="hero__orb hero__orb--b" />

      <div className="container hero__inner">
        {/* ── Left column ── */}
        <div className="hero__copy">
          <div className="hero__greeting">
            <span className="hero__greet-line" /> Hello, I'm
          </div>

          <h1 className="hero__name">
            Vishal<br /><span className="hero__name--teal">Gupta</span>
          </h1>

          <div className="hero__role">
            <span className="hero__role-pre">I build </span>
            <span className="hero__role-typed" ref={typedRef} />
            <span className="hero__cursor">|</span>
          </div>

          <p className="hero__bio">{profile?.summary || "Python Backend Developer specialising in Django & REST APIs."}</p>

          <div className="hero__ctas">
            <a href="#projects" className="btn btn-primary">
              View Projects
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#contact" className="btn btn-outline">Get in Touch</a>
            {profile?.resume_url && (
              <a href={profile.resume_url} target="_blank" rel="noreferrer" className="btn btn-ghost">
                Download CV
              </a>
            )}
          </div>

          <div className="hero__socials">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" className="hero__soc" aria-label="GitHub">
                <GH />
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hero__soc" aria-label="LinkedIn">
                <LI />
              </a>
            )}
            {profile?.portfolio_url && (
              <a href={profile.portfolio_url} target="_blank" rel="noreferrer" className="hero__soc" aria-label="Portfolio API">
                <WW />
              </a>
            )}
          </div>

          <div className="hero__stats">
            {stats.map((s,i) => (
              <div className="hero__stat" key={i}>
                <span className="hero__stat-n">{s.n}</span>
                <span className="hero__stat-l">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column — avatar ── */}
        <div className="hero__visual">
          <div className="hero__av-wrap">
            <div className="hero__av-ring-outer" />
            <div className="hero__av-ring-inner" />
            <div className="hero__av">
              {profile?.photo_url ? (
                <img src={profile.photo_url} alt={profile.name} className="hero__av-img" />
              ) : (
                <span className="hero__av-init">
                  {(profile?.name||'VG').split(' ').map(w=>w[0]).join('').slice(0,2)}
                </span>
              )}
            </div>
            {/* floating tech pills */}
            <div className="hero__pill hero__pill--1">🐍 Python</div>
            <div className="hero__pill hero__pill--2">🦄 Django</div>
            <div className="hero__pill hero__pill--3">🔗 REST API</div>
            <div className="hero__pill hero__pill--4">🛢️ MySQL</div>
          </div>
        </div>
      </div>

      <a href="#about" className="hero__scroll-hint">
        <span>Scroll</span>
        <div className="hero__scroll-bar" />
      </a>
    </section>
  );
}

const GH = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);
const LI = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const WW = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);
