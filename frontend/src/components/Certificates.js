import React, { useState } from 'react';
import './Certificates.css';

const TYPE_ICON = {
  internship:  '🏢',
  experience:  '💼',
  training:    '📚',
  course:      '🎓',
  achievement: '🏆',
};

const TYPE_COLOR = {
  internship:  '#00C2E0',
  experience:  '#64FFDA',
  training:    '#F59E0B',
  course:      '#A78BFA',
  achievement: '#FB923C',
};

export default function Certificates({ certificates }) {
  const [selected, setSelected] = useState(null);
  const [filter,   setFilter  ] = useState('all');

  if (!certificates || certificates.length === 0) {
    return (
      <section className="certs section-pad" id="certificates">
        <div className="container">
          <p className="sec-label">Credentials</p>
          <h2 className="sec-title">Certificates &amp; <span className="hi">Credentials</span></h2>
          <div className="sec-line" />
          <div className="certs__empty">
            <span className="certs__empty-icon">📜</span>
            <h3>No certificates uploaded yet</h3>
            <p>Upload your internship &amp; experience certificates via the <strong>Django Admin</strong> panel at <code>/admin/portfolio/certificate/add/</code></p>
          </div>
        </div>
      </section>
    );
  }

  const types = ['all', ...new Set(certificates.map(c => c.cert_type))];
  const shown = filter === 'all' ? certificates : certificates.filter(c => c.cert_type === filter);

  return (
    <section className="certs section-pad" id="certificates">
      <div className="container">
        <p className="sec-label">Credentials</p>
        <h2 className="sec-title">Certificates &amp; <span className="hi">Credentials</span></h2>
        <div className="sec-line" />

        {/* Filter tabs */}
        <div className="certs__tabs">
          {types.map(t => (
            <button key={t} className={`certs__tab ${filter===t?'certs__tab--on':''}`}
              onClick={() => setFilter(t)}>
              {t === 'all' ? 'All' : (t.charAt(0).toUpperCase() + t.slice(1))}
            </button>
          ))}
        </div>

        <div className="certs__grid">
          {shown.map((c, i) => (
            <div className="cert-card" key={c.id}
              style={{ animationDelay: `${i * .08}s`, '--accent': TYPE_COLOR[c.cert_type] || '#00C2E0' }}>

              {/* Top stripe */}
              <div className="cert-card__stripe" />

              <div className="cert-card__body">
                {/* Thumbnail or icon */}
                {c.thumbnail_url ? (
                  <div className="cert-card__thumb">
                    <img src={c.thumbnail_url} alt={c.title} />
                  </div>
                ) : (
                  <div className="cert-card__icon">
                    {TYPE_ICON[c.cert_type] || '📜'}
                  </div>
                )}

                <div className="cert-card__info">
                  <span className="cert-card__type"
                    style={{ color: TYPE_COLOR[c.cert_type] || '#00C2E0',
                             borderColor: `${TYPE_COLOR[c.cert_type]}40` }}>
                    {c.cert_type_display}
                  </span>
                  <h3 className="cert-card__title">{c.title}</h3>
                  <p className="cert-card__by">{c.issued_by}</p>
                  {c.issue_date && (
                    <p className="cert-card__date">
                      📅 {new Date(c.issue_date).toLocaleDateString('en-IN', { year:'numeric', month:'long' })}
                    </p>
                  )}
                  {c.description && <p className="cert-card__desc">{c.description}</p>}
                </div>

                <div className="cert-card__actions">
                  {c.file_url && (
                    <>
                      <a href={c.file_url} target="_blank" rel="noreferrer"
                        className="btn btn-primary cert-card__btn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        View
                      </a>
                      <button className="btn btn-outline cert-card__btn"
                        onClick={() => setSelected(c)}>
                        👁 Preview
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Full-screen preview modal ── */}
      {selected && (
        <div className="cert-modal" onClick={() => setSelected(null)}>
          <div className="cert-modal__box" onClick={e => e.stopPropagation()}>
            <div className="cert-modal__hdr">
              <div>
                <h3 className="cert-modal__title">{selected.title}</h3>
                <p className="cert-modal__by">{selected.issued_by}</p>
              </div>
              <button className="cert-modal__close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="cert-modal__body">
              {selected.thumbnail_url ? (
                <img src={selected.thumbnail_url} alt={selected.title} className="cert-modal__img" />
              ) : selected.file_url?.endsWith('.pdf') ? (
                <iframe src={selected.file_url} title={selected.title} className="cert-modal__iframe" />
              ) : selected.file_url ? (
                <img src={selected.file_url} alt={selected.title} className="cert-modal__img" />
              ) : (
                <div className="cert-modal__no-preview">
                  <span>📄</span><p>No preview available</p>
                </div>
              )}
            </div>
            <div className="cert-modal__footer">
              {selected.file_url && (
                <a href={selected.file_url} target="_blank" rel="noreferrer" className="btn btn-primary">
                  Open Full Document
                </a>
              )}
              <button className="btn btn-ghost" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
