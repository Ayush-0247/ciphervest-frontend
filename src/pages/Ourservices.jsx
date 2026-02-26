import React, { useEffect, useRef, useState,  } from "react";
import "./Ourservices.css";
/* ─────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────── */

const services = [
  {
    num: "01", category: "Payments & Infrastructure", title: "Digital Payment Infrastructure",
    headline: "Move money at the speed of the internet.",
    body: "Our global payment rails process over 4 million transactions per second with sub-100ms latency across 140+ countries. Built on ISO 20022 messaging standards, our infrastructure connects banks, fintechs, and merchants through a single, unified API — eliminating intermediaries and cutting cross-border fees by up to 80%.",
    detail: "Whether you're settling payroll in 60 currencies, enabling real-time merchant payouts, or building embedded checkout flows, NovaPay's payment engine handles the complexity so you can focus on growth.",
    metrics: [{ value: "4M+", label: "Transactions / sec" }, { value: "<100ms", label: "Global latency" }, { value: "80%", label: "Fee reduction" }],
    tag: "Payments", link: "Explore payment solutions",
  },
  {
    num: "02", category: "Blockchain & Web3", title: "Blockchain & Smart Contracts",
    headline: "Settlement in seconds, not days.",
    body: "We deploy production-grade smart contracts on permissioned and public ledgers — transforming multi-day clearing cycles into near-instant finality. Our blockchain layer is interoperable with Ethereum, Hyperledger, and Stellar, giving institutions the flexibility to choose their infrastructure without lock-in.",
    detail: "From tokenised bonds and trade finance to digital identity verification, our Web3 services are engineered to meet institutional compliance requirements while unlocking the efficiency gains of decentralised infrastructure.",
    metrics: [{ value: "2s", label: "Avg. settlement time" }, { value: "3", label: "Blockchain networks" }, { value: "$2.8B", label: "On-chain volume" }],
    tag: "Web3", link: "View blockchain capabilities",
  },
  {
    num: "03", category: "AI & Credit Intelligence", title: "AI-Based Credit Scoring",
    headline: "Fair credit decisions for the next billion.",
    body: "Our proprietary machine learning models evaluate 300+ behavioural, transactional, and alternative data signals to produce real-time credit assessments — with decisions returned in under 2 seconds. Unlike legacy FICO models, our engine continuously learns, adapting to economic shifts without manual recalibration.",
    detail: "We serve lenders, neobanks, and BNPL platforms looking to expand access responsibly. Our explainability layer ensures every credit decision can be audited, challenged, and understood — meeting GDPR, ECOA, and Fair Lending requirements out of the box.",
    metrics: [{ value: "300+", label: "Data signals" }, { value: "<2s", label: "Decision speed" }, { value: "31%", label: "Default reduction" }],
    tag: "AI / ML", link: "See how credit scoring works",
  },
  {
    num: "04", category: "Banking as a Service", title: "Secure API Banking",
    headline: "Embed financial services into any product.",
    body: "Our Open Banking APIs, built to PSD2, CDR, and FDX standards, give developers the primitives to launch accounts, cards, and payments in days — not months. Every endpoint is protected by mutual TLS, OAuth 2.0, and real-time anomaly detection, backed by our 99.99% uptime SLA.",
    detail: "From launching branded debit cards for your user base to wiring KYC flows directly into your onboarding, NovaPay's Banking-as-a-Service platform removes the regulatory and engineering barriers between your product and financial services.",
    metrics: [{ value: "99.99%", label: "API uptime SLA" }, { value: "SOC 2", label: "Type II certified" }, { value: "1 day", label: "Integration time" }],
    tag: "BaaS", link: "Read the API documentation",
  },
  {
    num: "05", category: "Data & Analytics", title: "Real-Time Financial Analytics",
    headline: "Decisions powered by live intelligence.",
    body: "Our streaming analytics platform ingests millions of financial events per minute, surfaces trends, and delivers actionable dashboards — all in real time. Built on an Apache Kafka + Flink backbone, it connects to your existing data warehouse or operates as a standalone insights layer with pre-built fintech widgets.",
    detail: "Finance teams, product managers, and risk officers all get purpose-built views. From fraud heatmaps and revenue waterfalls to cohort-level churn signals, NovaPay Analytics turns raw transaction data into your most powerful competitive asset.",
    metrics: [{ value: "10M+", label: "Events / minute" }, { value: "50+", label: "Pre-built dashboards" }, { value: "real-time", label: "Data freshness" }],
    tag: "Analytics", link: "Explore the analytics platform",
  },
  {
    num: "06", category: "Risk & Compliance", title: "Regulatory & Compliance Suite",
    headline: "Stay compliant. Everywhere you operate.",
    body: "Our RegTech layer automates KYC, AML screening, sanctions checking, and transaction monitoring — updated continuously as regulations change across 80+ jurisdictions. Rule engines, model governance, and audit trails come standard, so your compliance team spends time on decisions, not data entry.",
    detail: "Whether you're regulated by the FCA, SEC, MAS, or RBI, our compliance suite adapts to local requirements with jurisdiction-specific rulesets, multi-language document processing, and a one-click audit export built to satisfy regulator requests on the first submission.",
    metrics: [{ value: "80+", label: "Jurisdictions" }, { value: "<24h", label: "KYC turnaround" }, { value: "99.8%", label: "AML accuracy" }],
    tag: "RegTech", link: "Discover compliance tools",
  },
  {
    num: "07", category: "FX & Multi-Currency", title: "Multi-Currency Wallets & FX",
    headline: "One wallet. Every market.",
    body: "Hold, convert, and spend in 60+ currencies at live mid-market rates with zero hidden spreads. Our FX engine aggregates liquidity from 12 Tier-1 banks, delivering institutional-grade rates to businesses of all sizes. Batch conversions, forward contracts, and rate alerts give treasury teams full control.",
    detail: "Pair with our payment infrastructure to pay suppliers in local currency, accept checkout in any denomination, or reconcile multi-entity books across regions — all from a single dashboard with real-time P&L tracking.",
    metrics: [{ value: "60+", label: "Currencies" }, { value: "12", label: "Liquidity providers" }, { value: "0%", label: "Hidden spread" }],
    tag: "FX", link: "View FX capabilities",
  },
  {
    num: "08", category: "Security & Fraud", title: "Fraud Detection & Prevention",
    headline: "Stop fraud before it moves.",
    body: "Our real-time risk engine analyses 200+ signals — device fingerprinting, behavioural biometrics, velocity rules, and network graph anomalies — to flag suspicious activity in under 50 milliseconds. Adaptive models retrain daily, staying ahead of novel attack patterns without manual rule tuning.",
    detail: "Configurable risk thresholds let you tune the balance between security and conversion. Step-up authentication, dynamic friction, and automated case management ensure your fraud team responds with precision — not noise.",
    metrics: [{ value: "<50ms", label: "Detection speed" }, { value: "200+", label: "Risk signals" }, { value: "94%", label: "Fraud catch rate" }],
    tag: "Risk", link: "Explore fraud prevention",
  },
];

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