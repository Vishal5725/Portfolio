import React from 'react';
import './Education.css';

const EDU_ICON = ['🎓', '📐', '📗', '📘'];

export default function Education({ education }) {
  return (
    <section className="edu section-pad" id="education">
      <div className="container">
        <p className="sec-label">Academic Background</p>
        <h2 className="sec-title">Education &amp; <span className="hi">Qualifications</span></h2>
        <div className="sec-line" />

        <div className="edu__grid">
          {(education || []).map((e, i) => (
            <div className="edu-card" key={e.id} style={{ animationDelay: `${i * .1}s` }}>
              <div className="edu-card__icon">{EDU_ICON[i] || '🎓'}</div>
              <div className="edu-card__body">
                <div className="edu-card__top">
                  <h3 className="edu-card__degree">{e.degree}</h3>
                  <span className={`edu-card__status ${e.status === 'Pursuing' ? 'edu-card__status--live' : ''}`}>
                    {e.status}
                  </span>
                </div>
                <p className="edu-card__inst">{e.institution}</p>
                {e.board_university && (
                  <p className="edu-card__board">{e.board_university}</p>
                )}
                <div className="edu-card__footer">
                  <span className="edu-card__dur">{e.duration}</span>
                  {e.grade && <span className="edu-card__grade">Grade: {e.grade}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
