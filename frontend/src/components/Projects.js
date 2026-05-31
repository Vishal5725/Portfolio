import React, { useState } from 'react';
import './Projects.css';

const STATUS_META = {
  live:        { label:'Live',         color:'#00C2E0', dot:true  },
  development: { label:'In Progress',  color:'#F59E0B', dot:true  },
  completed:   { label:'Completed',    color:'#64FFDA', dot:false },
};

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('all');
  const filters = ['all','featured','live','completed'];

  const shown = filter === 'all'     ? projects
              : filter === 'featured' ? projects.filter(p=>p.featured)
              : projects.filter(p=>p.status===filter);

  return (
    <section className="projects section-pad" id="projects">
      <div className="container">
        <p className="sec-label">My Work</p>
        <h2 className="sec-title">Featured <span className="hi">Projects</span></h2>
        <div className="sec-line" />

        <div className="projects__tabs">
          {filters.map(f => (
            <button key={f} className={`projects__tab ${filter===f?'projects__tab--on':''}`}
              onClick={()=>setFilter(f)}>
              {f === 'all' ? 'All Projects' : f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {(shown||[]).map((p,i) => <ProjectCard key={p.id} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, i }) {
  const meta = STATUS_META[p.status] || STATUS_META.completed;
  return (
    <div className={`pcard ${p.featured?'pcard--feat':''}`} style={{animationDelay:`${i*.08}s`}}>
      <div className="pcard__top-bar" />

      {/* Thumbnail */}
      {p.thumbnail_url ? (
        <div className="pcard__thumb">
          <img src={p.thumbnail_url} alt={p.title} />
          <div className="pcard__thumb-overlay" />
        </div>
      ) : (
        <div className="pcard__thumb pcard__thumb--placeholder">
          <span>{p.title.slice(0,2).toUpperCase()}</span>
        </div>
      )}

      <div className="pcard__body">
        <div className="pcard__meta">
          {p.featured && <span className="pcard__feat">⭐ Featured</span>}
          <span className="pcard__status" style={{color:meta.color}}>
            {meta.dot && <span className="pcard__dot" style={{background:meta.color}} />}
            {meta.label}
          </span>
        </div>

        <h3 className="pcard__title">{p.title}</h3>
        <p className="pcard__sub">{p.subtitle}</p>
        <p className="pcard__desc">{p.description}</p>

        <div className="pcard__tech">
          {(p.tech_list||[]).map((t,i)=><span className="tag" key={i}>{t}</span>)}
        </div>

        <div className="pcard__links">
          {p.live_url && (
            <a href={p.live_url} target="_blank" rel="noreferrer" className="pcard__link pcard__link--live">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </a>
          )}
          {p.github_url && (
            <a href={p.github_url} target="_blank" rel="noreferrer" className="pcard__link pcard__link--gh">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"/></svg>
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
