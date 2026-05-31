import React, { useState, useEffect } from 'react';
import { fetchPortfolio, fetchCertificates } from './hooks/useApi';
import { FALLBACK } from './hooks/fallback';

import Navbar      from './components/Navbar';
import Hero        from './components/Hero';
import About       from './components/About';
import Skills      from './components/Skills';
import Projects    from './components/Projects';
import Experience  from './components/Experience';
import Certificates from './components/Certificates';
import Education   from './components/Education';
import Contact     from './components/Contact';
import Footer      from './components/Footer';

export default function App() {
  const [data,     setData]     = useState(null);
  const [certs,    setCerts]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [offline,  setOffline]  = useState(false);

  useEffect(() => {
    Promise.all([fetchPortfolio(), fetchCertificates()])
      .then(([pd, cd]) => {
        setData(pd.data);
        setCerts(cd.data);
        setLoading(false);
      })
      .catch(err => {
        console.warn('⚠️ Backend offline — using fallback data.', err.message);
        setData(FALLBACK);
        setCerts(FALLBACK.certificates || []);
        setOffline(true);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="loader">
      <div className="loader__ring" />
      <p className="loader__text">Loading portfolio…</p>
    </div>
  );

  const {
    profile, skill_categories, projects,
    experiences, education, certifications,
  } = data;

  return (
    <>
      {offline && (
        <div style={{
          background:'rgba(245,158,11,.12)', borderBottom:'1px solid rgba(245,158,11,.3)',
          color:'#F59E0B', textAlign:'center', padding:'9px 20px',
          fontSize:'.82rem', fontFamily:'var(--font-body)',
        }}>
          ⚡ Running on static data — start the Django backend for live content &amp; dynamic uploads.
        </div>
      )}
      <Navbar   profile={profile} />
      <main>
        <Hero         profile={profile} />
        <About        profile={profile} certifications={certifications} />
        <Skills       categories={skill_categories} />
        <Projects     projects={projects} />
        <Experience   experiences={experiences} />
        <Certificates certificates={certs} />
        <Education    education={education} />
        <Contact      profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
