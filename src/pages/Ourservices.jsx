import React, { useEffect, useRef, useState } from "react";
import "./Ourservices.css";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────── */

const processSteps = [
  {
    num: "I",
    title: "Discovery & Goal Alignment",
    body: "We begin with a focused consultation to understand your financial goals, risk tolerance, and timeline — ensuring every strategy is tailored to you, not the market average.",
    icon: "◎",
  },
  {
    num: "II",
    title: "Precision Portfolio Architecture",
    body: "Our analysts build a diversified portfolio across equities, digital assets, and alternative investments — aligned with your risk profile and designed for long-term compounding.",
    icon: "◈",
  },
  {
    num: "III",
    title: "Active Market Intelligence",
    body: "Markets move constantly. We track trends, volatility, and emerging opportunities to make timely decisions that protect and grow your capital.",
    icon: "◉",
  },
  {
    num: "IV",
    title: "Tax Efficiency & Wealth Structuring",
    body: "Through strategic tax planning and compliant financial structuring, we help minimize liabilities and preserve more of your wealth.",
    icon: "⊕",
  },
];

const testimonials = [
  {
    quote:
      "They didn't just manage my portfolio — they reshaped how I think about wealth. The balance between equities and crypto exposure was exactly what I needed.",
    author: "Arjun Mehta",
    role: "Private Investor",
    region: "Mumbai",
  },
  {
    quote:
      "The tax structuring alone was a game-changer for our firm. These aren't just advisors — they're financial architects who understand where the world is heading.",
    author: "Neha Kapoor",
    role: "Startup Founder",
    region: "Delhi",
  },
  {
    quote:
      "Transparent, proactive, and always three steps ahead. Managing international investments used to feel complex — now it feels effortless.",
    author: "Rahul Bansal",
    role: "Business Owner",
    region: "Singapore",
  },
];

const logos = [
  "Crypto Markets",
  "Global Equity Markets",
  "Portfolio Advisory",
  "Tax Consultancy",
  "Wealth Planning",
  "Risk Management",
];

/* ─────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────── */

export default function OurServices() {
  const navigate = useNavigate();

  const goToContact = () => navigate("/contact");
  const goToOutmoto = () => navigate("/outmoto");

  const [heroVisible, setHeroVisible] = useState(false);
  const [processVisible, setProcessVisible] = useState(false);
  const [trustVisible, setTrustVisible] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const heroRef = useRef(null);
  const processRef = useRef(null);
  const trustRef = useRef(null);

  useEffect(() => {
    const observers = [];

    const heroObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeroVisible(true); },
      { threshold: 0.15 }
    );
    if (heroRef.current) heroObs.observe(heroRef.current);
    observers.push(heroObs);

    const processObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setProcessVisible(true); },
      { threshold: 0.15 }
    );
    if (processRef.current) processObs.observe(processRef.current);
    observers.push(processObs);

    const trustObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTrustVisible(true); },
      { threshold: 0.1 }
    );
    if (trustRef.current) trustObs.observe(trustRef.current);
    observers.push(trustObs);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setTestimonialIdx((i) => (i + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="os-page">

      {/* HERO */}
      <div className={`os-hero ${heroVisible ? "visible" : ""}`} ref={heroRef}>
        <div className="os-hero-inner">

          <p className="os-eyebrow">What We Do</p>

          <h1 className="os-hero-title">
            Intelligent capital. <br />
            <em>Engineered for your future.</em>
          </h1>

          <p className="os-hero-body">
            We help ambitious individuals and forward-thinking businesses grow
            wealth with conviction — through institutional-grade crypto
            exposure, global equity strategies, diversified portfolio
            construction, and tax-smart financial planning.
          </p>

        </div>

        <div className="os-hero-meta">

          <span className="os-hero-stat">
            <strong>Crypto</strong> Investments
          </span>

          <span className="os-hero-divider" />

          <span className="os-hero-stat">
            <strong>Stock</strong> Trading
          </span>

          <span className="os-hero-divider" />

          <span className="os-hero-stat">
            <strong>Portfolio</strong> Management
          </span>

          <span className="os-hero-stat">
            <strong>Tax</strong> Consultancy
          </span>

          <button className="contactBtn" onClick={goToContact}>
            Begin Your Wealth Journey →
          </button>

        </div>
      </div>

      {/* TRUST BAND */}
      <div
        className={`os-trust-band ${trustVisible ? "visible" : ""}`}
        ref={trustRef}
      >
        <div className="os-trust-inner">

          <p className="os-trust-label">
            Trusted expertise across global markets, digital assets & financial advisory
          </p>

          <div className="os-logos-track">
            <div className="os-logos-scroll">
              {[...logos, ...logos].map((name, i) => (
                <span key={i} className="os-logo-item">{name}</span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* HOW IT WORKS */}
      <div
        className={`os-process ${processVisible ? "visible" : ""}`}
        ref={processRef}
      >
        <div className="os-process-inner">

          <div className="os-process-header">

            <p className="os-eyebrow">Our Process</p>

            <h2 className="os-process-title">
              Structured thinking. <br />
              <em>Measurable results.</em>
            </h2>

            <p className="os-process-subtitle">
              A disciplined four-stage framework that transforms your financial
              ambitions into a living, breathing investment strategy — designed
              to evolve as markets and life do.
            </p>

          </div>

          <div className="os-process-steps">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="os-step"
                style={{ "--delay": `${i * 0.15}s` }}
              >
                <div className="os-step-icon">{step.icon}</div>
                <div className="os-step-num">{step.num}</div>

                <div className="os-step-content">
                  <h3 className="os-step-title">{step.title}</h3>
                  <p className="os-step-body">{step.body}</p>
                </div>

                {i < processSteps.length - 1 && (
                  <div className="os-step-connector" />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="os-testimonials">
        <div className="os-testimonials-inner">

          <p className="os-eyebrow" style={{ marginBottom: 48 }}>
            Clients Who Grew With Us
          </p>

          <div className="os-testimonial-stage">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`os-testimonial-card ${
                  i === testimonialIdx
                    ? "active"
                    : i === (testimonialIdx - 1 + testimonials.length) % testimonials.length
                    ? "prev"
                    : "next"
                }`}
              >
                <div className="os-testimonial-quote-mark">"</div>

                <blockquote className="os-testimonial-quote">
                  {t.quote}
                </blockquote>

                <div className="os-testimonial-author">
                  <div className="os-testimonial-avatar">
                    {t.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="os-testimonial-name">{t.author}</p>
                    <p className="os-testimonial-role">
                      {t.role} · {t.region}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="os-testimonial-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`os-dot ${i === testimonialIdx ? "active" : ""}`}
                onClick={() => setTestimonialIdx(i)}
              />
            ))}
          </div>

        </div>
      </div>

      {/* CTA */}
      <div className="os-cta">
        <div className="os-cta-inner">

          <p className="os-cta-eyebrow">Your Next Move</p>

          <h2 className="os-cta-title">
            Stop leaving returns <br />
            <em>on the table.</em>
          </h2>

          <p className="os-cta-body">
            Whether you're entering crypto for the first time, scaling a
            multi-asset portfolio, or restructuring your tax position — our
            advisors bring the clarity, strategy, and execution you need to
            move with confidence.
          </p>

          <div className="os-cta-actions">
            <button className="os-btn-primary" onClick={goToContact}>
              Book a Free Consultation
            </button>
            <button className="os-btn-ghost" onClick={goToOutmoto}>
              Our Story & Mission →
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}