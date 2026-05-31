import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';

const EXPERTISE = [
  'REST API Design','API Integration','ORM Optimisation','JWT Authentication',
  'CRUD Operations','Database Design','Backend Architecture','Version Control',
  'Agile / Scrum','PEP 8 Standards','Code Review','Performance Profiling',
  'Django Admin','Serializers & ViewSets',
];

export default function Skills({ categories }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold:.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="skills section-pad" id="skills" ref={ref}>
      <div className="container">
        <p className="sec-label">Technical Expertise</p>
        <h2 className="sec-title">Skills &amp; <span className="hi">Technologies</span></h2>
        <div className="sec-line" />

        <div className="skills__cats">
          {(categories||[]).map((cat, ci) => (
            <div className="skills__cat" key={cat.id} style={{animationDelay:`${ci*.1}s`}}>
              <div className="skills__cat-hdr">
                <span className="skills__cat-icon">{cat.icon}</span>
                <h3 className="skills__cat-name">{cat.name}</h3>
              </div>
              {(cat.skills||[]).map((sk, si) => (
                <div className="skills__bar" key={sk.id} style={{animationDelay:`${ci*.1+si*.06}s`}}>
                  <div className="skills__bar-row">
                    <span className="skills__bar-name">{sk.name}</span>
                    <span className="skills__bar-pct">{sk.percentage}%</span>
                  </div>
                  <div className="skills__track">
                    <div className="skills__fill"
                      style={{
                        width: visible ? `${sk.percentage}%` : '0%',
                        transitionDelay: `${ci*.1+si*.08}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="skills__expertise">
          <h3 className="skills__exp-title">
            <span className="skills__exp-bar" /> Backend Expertise Tags
          </h3>
          <div className="skills__tags">
            {EXPERTISE.map((e,i) => <span className="tag" key={i}>{e}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
