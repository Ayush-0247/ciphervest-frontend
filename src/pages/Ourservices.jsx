import React, { useEffect, useRef, useState,  } from "react";
import "./Ourservices.css";
import {useNavigate} from "react-router-dom";
/* ─────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────── */


const processSteps = [
  { num: "I", title: "Onboard in a day", body: "Sandbox credentials, complete API documentation, and a dedicated solutions engineer on call from day one. No procurement cycles, no legal bottlenecks.", icon: "◈" },
  { num: "II", title: "Integrate with one SDK", body: "A single NovaPay SDK covers payments, identity, compliance, and analytics. Unified webhooks, idempotent endpoints, and exhaustive test fixtures.", icon: "◎" },
  { num: "III", title: "Go live with confidence", body: "Staged rollouts, feature flags, and real-time monitoring ensure you ship to production safely. Our infrastructure scales automatically under any load.", icon: "◉" },
  { num: "IV", title: "Scale without limits", body: "As you grow across markets and currencies, NovaPay's global fabric expands with you. Volume-based pricing means your margins improve as you scale.", icon: "⊕" },
];

const testimonials = [
  { quote: "NovaPay cut our cross-border settlement time from three days to under eight seconds. That's not an improvement — it's a different category of product.", author: "Priya Sundaram", role: "CTO, Kova Financial", region: "Singapore" },
  { quote: "We launched a full embedded banking suite — cards, accounts, and FX — in eleven days. The compliance layer alone would have taken our team six months to build.", author: "Marcus Osei", role: "VP Engineering, Lattice Pay", region: "London" },
  { quote: "The credit scoring engine approved 40% more applicants in our first month without increasing default rates. The explainability reports satisfied our regulators on first submission.", author: "Valentina Cruz", role: "Chief Risk Officer, Nomo Bank", region: "Mexico City" },
];

const logos = ["Stripe Atlas", "Revolut Business", "Wise Platform", "Adyen", "Brex", "Mercury", "Ramp", "Airwallex"];

/* ─────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────── */

export default function OurServices() {
  const navigate = useNavigate();  
   const goToContact = () => {
    navigate("/contact");
  };
  const [visible, setVisible] = useState(new Set());
  const [heroVisible, setHeroVisible] = useState(false);
  const [processVisible, setProcessVisible] = useState(false);
  const [trustVisible, setTrustVisible] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const rowRefs = useRef([]);
  const heroRef = useRef(null);
  const processRef = useRef(null);
  const trustRef = useRef(null);
  const serviceListRef = useRef(null);

  useEffect(() => {
    const observers = [];

    const heroObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeroVisible(true); }, { threshold: 0.15 });
    if (heroRef.current) heroObs.observe(heroRef.current);
    observers.push(heroObs);

    const processObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setProcessVisible(true); }, { threshold: 0.15 });
    if (processRef.current) processObs.observe(processRef.current);
    observers.push(processObs);

    const trustObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTrustVisible(true); }, { threshold: 0.1 });
    if (trustRef.current) trustObs.observe(trustRef.current);
    observers.push(trustObs);

    const rowObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = parseInt(e.target.dataset.index);
          setVisible((prev) => new Set([...prev, idx]));
        }
      });
    }, { threshold: 0.3 });
    rowRefs.current.forEach((r) => { if (r) rowObs.observe(r); });
    observers.push(rowObs);

    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);



  return (
    <div className="os-page">



      {/* ── HERO ── */}
      <div className={`os-hero ${heroVisible ? "visible" : ""}`} ref={heroRef}>
        <div className="os-hero-inner">
          <p className="os-eyebrow">Our Services</p>
          <h1 className="os-hero-title">
            Smart financial solutions<br />
            <em>for a digital economy.</em>
          </h1>
          <p className="os-hero-body">
            From payment infrastructure to AI-powered credit and real-time compliance —
            NovaPay delivers the financial operating system for modern businesses
            operating at global scale.
          </p>
        </div>
        <div className="os-hero-meta">
          <span className="os-hero-stat"><strong>140+</strong> countries</span>
          <span className="os-hero-divider" />
          <span className="os-hero-stat"><strong>$180B</strong> processed annually</span>
          <span className="os-hero-divider" />
          <span className="os-hero-stat"><strong>2.4M</strong> businesses served</span>
         <button className="contactBtn" onClick={goToContact}>
Drop a query ...
</button>
          
        </div>
      </div>
  
      {/* ── NEW: TRUST BAND ── */}
      <div className={`os-trust-band ${trustVisible ? "visible" : ""}`} ref={trustRef}>
        <div className="os-trust-inner">
          <p className="os-trust-label">Trusted by leading fintechs, neobanks, and enterprises</p>
          <div className="os-logos-track">
            <div className="os-logos-scroll">
              {[...logos, ...logos].map((name, i) => (
                <span key={i} className="os-logo-item">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SERVICES LIST ── */}
      <div className="os-list" ref={serviceListRef}>
        {services.map((s, i) => (
          <div key={s.num} className={`os-row ${visible.has(i) ? "visible" : ""}`} data-index={i} ref={(el) => (rowRefs.current[i] = el)}>
            <div className="os-row-border" />
            <div className="os-row-inner">
              <div className="os-row-left">
                <span className="os-row-num">{s.num}</span>
                <span className="os-row-category">{s.category}</span>
                <span className="os-row-tag">{s.tag}</span>
              </div>
              <div className="os-row-centre">
                <h2 className="os-row-title">{s.title}</h2>
                <p className="os-row-headline">{s.headline}</p>
                <p className="os-row-body">{s.body}</p>
                <p className="os-row-detail">{s.detail}</p>
                <a className="os-row-link" href="#">{s.link} <span className="os-row-arrow">→</span></a>
              </div>
              <div className="os-row-right">
                {s.metrics.map((m, mi) => (
                  <div key={mi} className="os-metric">
                    <span className="os-metric-value">{m.value}</span>
                    <span className="os-metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="os-list-end-border" />
      </div>

      {/* ── NEW: HOW IT WORKS ── */}
      <div className={`os-process ${processVisible ? "visible" : ""}`} ref={processRef}>
        <div className="os-process-inner">
          <div className="os-process-header">
            <p className="os-eyebrow">How it works</p>
            <h2 className="os-process-title">
              From first API call<br /><em>to global scale.</em>
            </h2>
            <p className="os-process-subtitle">
              Most teams are in production within a week. Here's the journey.
            </p>
          </div>
          <div className="os-process-steps">
            {processSteps.map((step, i) => (
              <div key={i} className="os-step" style={{ "--delay": `${i * 0.15}s` }}>
                <div className="os-step-icon">{step.icon}</div>
                <div className="os-step-num">{step.num}</div>
                <div className="os-step-content">
                  <h3 className="os-step-title">{step.title}</h3>
                  <p className="os-step-body">{step.body}</p>
                </div>
                {i < processSteps.length - 1 && <div className="os-step-connector" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── NEW: TESTIMONIALS ── */}
      <div className="os-testimonials">
        <div className="os-testimonials-inner">
          <p className="os-eyebrow" style={{ marginBottom: 48 }}>What our clients say</p>
          <div className="os-testimonial-stage">
            {testimonials.map((t, i) => (
              <div key={i} className={`os-testimonial-card ${i === testimonialIdx ? "active" : i === (testimonialIdx - 1 + testimonials.length) % testimonials.length ? "prev" : "next"}`}>
                <div className="os-testimonial-quote-mark">"</div>
                <blockquote className="os-testimonial-quote">{t.quote}</blockquote>
                <div className="os-testimonial-author">
                  <div className="os-testimonial-avatar">{t.author.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <p className="os-testimonial-name">{t.author}</p>
                    <p className="os-testimonial-role">{t.role} · {t.region}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="os-testimonial-dots">
            {testimonials.map((_, i) => (
              <button key={i} className={`os-dot ${i === testimonialIdx ? "active" : ""}`} onClick={() => setTestimonialIdx(i)} aria-label={`Testimonial ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA FOOTER ── */}
      <div className="os-cta">
        <div className="os-cta-inner">
          <p className="os-cta-eyebrow">Get started</p>
          <h2 className="os-cta-title">Ready to build on<br /><em>NovaPay's platform?</em></h2>
          <p className="os-cta-body">
            Talk to a solutions expert, or start integrating with our developer sandbox — no commitment required.
          </p>
          <div className="os-cta-actions">
            <button className="os-btn-primary">Talk to an Expert</button>
            <button className="os-btn-ghost">Explore Documentation →</button>
          </div>
        </div>
      </div>

    </div>
  );
}