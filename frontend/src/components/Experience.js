import React, { useState } from 'react';
import './Experience.css';

const TYPE = {
  internship:{ label:'Internship', color:'#00C2E0' },
  training:  { label:'Training',   color:'#64FFDA' },
  fulltime:  { label:'Full-time',  color:'#F59E0B' },
  freelance: { label:'Freelance',  color:'#A78BFA' },
};

export default function Experience({ experiences }) {
  const [open, setOpen] = useState(0);   // expanded card index

  return (
    <section className="exp section-pad" id="experience">
      <div className="container">
        <p className="sec-label">Work History</p>
        <h2 className="sec-title">Professional <span className="hi">Experience</span></h2>
        <div className="sec-line" />

        <div className="exp__timeline">
          {(experiences||[]).map((e, i) => {
            const t = TYPE[e.exp_type] || TYPE.internship;
            const isOpen = open === i;
            return (
              <div key={e.id} className={`exp__item ${isOpen?'exp__item--open':''}`}
                style={{animationDelay:`${i*.12}s`}}>
                <div className="exp__dot"><div className="exp__dot-core" /></div>

                <div className="exp__card" onClick={() => setOpen(isOpen ? -1 : i)}>
                  <div className="exp__card-hdr">
                    <div className="exp__card-left">
                      <h3 className="exp__role">{e.role}</h3>
                      <p className="exp__company">{e.company}</p>
                    </div>
                    <div className="exp__card-right">
                      <span className="exp__dur">{e.duration}</span>
                      <span className="exp__type" style={{color:t.color, borderColor:`${t.color}40`}}>{t.label}</span>
                      {e.certificate && (
                        <span className="exp__cert-badge" title="Certificate attached">📜 Certificate</span>
                      )}
                    </div>
                    <span className="exp__arrow">{isOpen ? '▲' : '▼'}</span>
                  </div>

                  {isOpen && (
                    <div className="exp__bullets">
                      {(e.bullet_points||[]).map((b,bi) => (
                        <div className="exp__bullet" key={bi}>
                          <span className="exp__bullet-icon">▸</span>
                          <span>{b}</span>
                        </div>
                      ))}

                      {e.certificate && (
                        <div className="exp__cert-box">
                          <div className="exp__cert-info">
                            <span className="exp__cert-label">📜 {e.certificate.cert_type_display}</span>
                            <span className="exp__cert-by">{e.certificate.issued_by}</span>
                          </div>
                          <div className="exp__cert-btns">
                            {e.certificate.file_url && (
                              <a href={e.certificate.file_url} target="_blank" rel="noreferrer"
                                className="btn btn-primary" style={{fontSize:'.8rem',padding:'7px 14px'}}>
                                📄 View Certificate
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div className="exp__end" />
        </div>
      </div>
    </section>
  );
}
