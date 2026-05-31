import React, { useState, useEffect } from 'react';
import './Navbar.css';

const LINKS = [
  ['#about','About'], ['#skills','Skills'], ['#projects','Projects'],
  ['#experience','Experience'], ['#certificates','Certificates'],
  ['#education','Education'], ['#contact','Contact'],
];

export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const initials = (profile?.name || 'VG').split(' ').map(w=>w[0]).join('').slice(0,2);

  return (
    <nav className={`nav ${scrolled ? 'nav--stuck' : ''}`}>
      <div className="container nav__row">
        <a href="#hero" className="nav__brand">
          <span className="nav__badge">{initials}</span>
          <span className="nav__name">
            {profile?.name?.split(' ')[0] || 'Vishal'}<span className="nav__dot">.</span>
          </span>
          {profile?.is_available && <span className="nav__avail">Available</span>}
        </a>

        <ul className="nav__links">
          {LINKS.map(([h,l]) => (
            <li key={h}><a href={h} className="nav__link">{l}</a></li>
          ))}
        </ul>

        <div className="nav__right">
          <a href="#contact" className="btn btn-primary nav__cta">Hire Me</a>
          <button className={`nav__ham ${open?'open':''}`}
            onClick={()=>setOpen(o=>!o)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </div>

      <div className={`nav__mobile ${open?'nav__mobile--open':''}`}>
        {LINKS.map(([h,l]) => (
          <a key={h} href={h} className="nav__mob-link" onClick={()=>setOpen(false)}>{l}</a>
        ))}
        <a href="#contact" className="btn btn-primary" onClick={()=>setOpen(false)}>Hire Me</a>
      </div>
    </nav>
  );
}
