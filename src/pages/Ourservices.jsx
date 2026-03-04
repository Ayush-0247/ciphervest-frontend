import React, { useEffect, useRef, useState } from "react";
import "./Ourservices.css";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────── */

const processSteps = [
  {
    num: "I",
    title: "Client Consultation",
    body: "We begin with a personalized consultation to understand your financial goals, investment appetite, and long-term wealth strategy.",
    icon: "◎",
  },
  {
    num: "II",
    title: "Strategic Portfolio Planning",
    body: "Our analysts build a diversified portfolio across stocks, crypto assets, and other investment vehicles tailored to your risk profile.",
    icon: "◈",
  },
  {
    num: "III",
    title: "Active Market Management",
    body: "Our experts actively monitor market trends, trade opportunities, and rebalance portfolios to maximize long-term returns.",
    icon: "◉",
  },
  {
    num: "IV",
    title: "Tax Optimization & Advisory",
    body: "We help you legally reduce tax liabilities through smart financial structuring, investment planning, and compliance strategies.",
    icon: "⊕",
  },
];

const testimonials = [
  {
    quote:
      "Their portfolio strategy helped me diversify between equities and crypto while keeping risks under control.",
    author: "Arjun Mehta",
    role: "Private Investor",
    region: "Mumbai",
  },
  {
    quote:
      "The tax planning advice alone saved our firm a significant amount. Their financial consultants truly understand modern markets.",
    author: "Neha Kapoor",
    role: "Startup Founder",
    region: "Delhi",
  },
  {
    quote:
      "A reliable partner for managing my global investments. Transparent, strategic, and always ahead of the market curve.",
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

  const goToContact = () => {
    navigate("/contact");
  };

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
      ([e]) => {
        if (e.isIntersecting) setHeroVisible(true);
      },
      { threshold: 0.15 }
    );

    if (heroRef.current) heroObs.observe(heroRef.current);
    observers.push(heroObs);

    const processObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setProcessVisible(true);
      },
      { threshold: 0.15 }
    );

    if (processRef.current) processObs.observe(processRef.current);
    observers.push(processObs);

    const trustObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setTrustVisible(true);
      },
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

          <p className="os-eyebrow">Our Financial Services</p>

          <h1 className="os-hero-title">
            Strategic investments <br />
            <em>for modern wealth growth.</em>
          </h1>

          <p className="os-hero-body">
            We help individuals and businesses grow wealth through intelligent
            investments in crypto, global stock markets, and diversified
            portfolios — backed by expert advisory and tax optimization.
          </p>

        </div>

        <div className="os-hero-meta">

          <span className="os-hero-stat">
            <strong>Crypto</strong> investments
          </span>

          <span className="os-hero-divider" />

          <span className="os-hero-stat">
            <strong>Stock</strong> trading
          </span>

          <span className="os-hero-divider" />

          <span className="os-hero-stat">
            <strong>Portfolio</strong> management
          </span>

          <button className="contactBtn" onClick={goToContact}>
            Start Your Investment Journey →
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
            Expertise across global markets and digital assets
          </p>

          <div className="os-logos-track">
            <div className="os-logos-scroll">
              {[...logos, ...logos].map((name, i) => (
                <span key={i} className="os-logo-item">
                  {name}
                </span>
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
              From consultation <br />
              <em>to long-term wealth growth.</em>
            </h2>

            <p className="os-process-subtitle">
              Our investment process is designed to balance growth,
              diversification, and risk management.
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
            Client Experiences
          </p>

          <div className="os-testimonial-stage">

            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`os-testimonial-card ${
                  i === testimonialIdx
                    ? "active"
                    : i ===
                      (testimonialIdx - 1 + testimonials.length) %
                        testimonials.length
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
                    {t.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
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

          <p className="os-cta-eyebrow">Start Investing</p>

          <h2 className="os-cta-title">
            Build your financial future <br />
            <em>with expert guidance.</em>
          </h2>

          <p className="os-cta-body">
            Whether you're entering the crypto market, investing in equities,
            or optimizing your tax strategy — our advisors are here to help.
          </p>

          <div className="os-cta-actions">

            <button className="os-btn-primary" onClick={goToContact}>
              Book Consultation
            </button>

            <button className="os-btn-ghost">
              Learn More →
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}