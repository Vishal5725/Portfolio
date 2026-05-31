import React from 'react';
import './Footer.css';

export default function Footer({ profile }) {
  const year = new Date().getFullYear();
  const links = [
    ['#about','About'],['#skills','Skills'],['#projects','Projects'],
    ['#experience','Experience'],['#certificates','Certificates'],
    ['#education','Education'],['#contact','Contact'],
  ];
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__badge">VG</span>
            <span className="footer__name">Vishal Gupta</span>
          </div>
          <p className="footer__tagline">Building scalable backends with Python &amp; Django</p>
          <p className="footer__email">{profile?.email || 'vg016600@gmail.com'}</p>
        </div>

        <div className="footer__nav">
          <p className="footer__nav-title">Navigation</p>
          {links.slice(0,4).map(([h,l])=> <a key={h} href={h} className="footer__link">{l}</a>)}
        </div>

        <div className="footer__nav">
          <p className="footer__nav-title">More</p>
          {links.slice(4).map(([h,l])=> <a key={h} href={h} className="footer__link">{l}</a>)}
        </div>

        <div className="footer__connect">
          <p className="footer__nav-title">Connect</p>
          <a href={profile?.github||'#'} target="_blank" rel="noreferrer" className="footer__link">GitHub</a>
          <a href={profile?.linkedin||'#'} target="_blank" rel="noreferrer" className="footer__link">LinkedIn</a>
          <a href={profile?.portfolio_url||'#'} target="_blank" rel="noreferrer" className="footer__link">Portfolio API</a>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} <strong>Vishal Gupta</strong>. Built with <span className="hi">React</span> + <span className="hi">Django</span></p>
          <p className="footer__made">Designed &amp; Developed with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
}
