import { useEffect } from "react";
import "./Products.css";

// ─── Sparkline SVG ───
function Sparkline() {
  const points = [30, 45, 35, 60, 50, 70, 58, 75, 65, 82, 72, 88];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 376, h = 60;
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / (max - min)) * (h - 8) - 4;
    return `${x},${y}`;
  });
  const pathD = "M " + coords.join(" L ");
  const fillD = pathD + ` L ${w},${h} L 0,${h} Z`;

  return (
    <div className="fin-sparkline">
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="fin-sg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A88251" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#A88251" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={fillD} fill="url(#fin-sg)" />
        <path d={pathD} stroke="#A88251" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─── DATA ───
const products = [
  {
    icon: "🏦",
    name: "Vault Savings",
    desc: "Intelligent savings accounts that optimize returns automatically, adapting to market conditions in real time.",
    features: ["Up to 5.2% APY, compounded daily", "AI-driven rebalancing", "FDIC insured up to $2M", "Zero minimum balance"],
    featured: false,
  },
  {
    icon: "📈",
    name: "Meridian Invest",
    desc: "Institutional-grade portfolio management, now accessible to everyone. Algorithmic precision without the complexity.",
    features: ["Fractional shares from $1", "Tax-loss harvesting", "ESG-aligned portfolios", "Real-time risk analytics"],
    featured: true,
  },
  {
    icon: "💳",
    name: "Tempo Card",
    desc: "A beautifully crafted metal card that earns you more. Smart cashback tiers that reward how you actually spend your money.",
    features: ["Up to 4% cashback on all spend", "No foreign transaction fees", "Concierge service 24/7", "Travel lounge access"],
    featured: false,
  },
];

const steps = [
  { num: "01", title: "Create Account", desc: "Sign up in under 3 minutes. No paperwork, no branch visits, no friction." },
  { num: "02", title: "Connect & Verify", desc: "Link your existing accounts securely with bank-level 256-bit encryption." },
  { num: "03", title: "Set Your Goals", desc: "Tell us what you're working toward. Our AI builds a plan tailored to you." },
  { num: "04", title: "Watch It Grow", desc: "Automated strategies work continuously while you focus on what matters." },
];

const stats = [
  { num: "$48", suffix: "B+", desc: "Assets under management across all product categories" },
  { num: "1.2", suffix: "M+", desc: "Active users trust Aurum with their financial future" },
  { num: "99.9", suffix: "%", desc: "Platform uptime with enterprise-grade infrastructure" },
  { num: "4.8", suffix: "★", desc: "Average rating from 280,000+ verified customer reviews" },
];

const testimonials = [
  {
    text: "Aurum's Meridian Invest completely transformed how I think about wealth. I've grown my portfolio by 34% in 14 months without lifting a finger.",
    name: "Priya Nair",
    role: "UX Director, Bangalore",
    initials: "PN",
    large: true,
  },
  {
    text: "The Vault account beats every savings rate I've found. Moving my emergency fund here was the easiest financial decision I've made.",
    name: "Marcus Bell",
    role: "Software Engineer, Austin",
    initials: "MB",
    large: false,
  },
  {
    text: "Tempo Card's cashback on my business expenses alone paid for itself in the first month.",
    name: "Layla Hassan",
    role: "Founder, Dubai",
    initials: "LH",
    large: false,
  },
];

const plans = [
  {
    plan: "Essential",
    price: "₹0",
    period: "Forever free",
    features: ["Vault Savings (3.8% APY)", "Basic debit card", "Up to 2 linked accounts", "Standard support"],
    featured: false,
  },
  {
    plan: "Premium",
    price: "₹799",
    period: "per month, billed annually",
    features: ["Vault+ Savings (5.2% APY)", "Meridian Invest (full access)", "Tempo Metal Card", "Unlimited accounts", "Priority 24/7 support", "Tax reports & insights"],
    featured: true,
    badge: "Most Popular",
  },
  {
    plan: "Private",
    price: "Custom",
    period: "for HNIs & businesses",
    features: ["Dedicated relationship manager", "Custom investment mandates", "White-glove concierge", "API access", "Multi-entity management"],
    featured: false,
  },
];

const logos = ["Softbank", "Sequoia", "Y Combinator", "Tiger Global", "Bessemer"];

// ─── MAIN COMPONENT ───
export default function ProductPage() {
  // Removed IntersectionObserver (useReveal) to ensure 100% visibility 
  // and fix scrolling/visibility bugs caused by components failing to appear.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="fin-root">

      {/* Decorative Top Gradient */}
      <div className="fin-top-gradient"></div>

      {/* HERO SECTION */}
      <section className="fin-hero">
        <div className="fin-hero-inner">
          <div className="fin-hero-content">
            <div className="fin-badge">
              <span className="fin-badge-dot"></span>
              <span className="fin-badge-text">Now live in India, UAE & Singapore</span>
            </div>

            <h1 className="fin-title">
              Finance that works <br />
              <span className="fin-italic-serif">as hard as you do.</span>
            </h1>

            <p className="fin-subtitle">
              Aurum is the all-in-one financial platform for the ambitious.
              Save smarter, invest better, and spend with confidence — all from one beautifully simple app.
            </p>

            <div className="fin-actions">
              <button className="fin-btn-primary">Open free account</button>
              <button className="fin-btn-secondary">
                Book a demo <span className="fin-arr">→</span>
              </button>
            </div>
          </div>

          <div className="fin-hero-visual">
            <div className="fin-card fin-dashboard-card">
              <div className="fin-dash-header">
                <span className="fin-dash-label">Portfolio Value</span>
                <span className="fin-status-chip">
                  <span className="fin-status-dot"></span> Active
                </span>
              </div>
              <div className="fin-dash-balance">₹24,81,200</div>
              <div className="fin-dash-change">
                <span className="fin-trend-up">▲</span> +₹3,42,800 (16.0%) this year
              </div>

              <Sparkline />

              <div className="fin-dash-stats">
                <div className="fin-dash-stat">
                  <span className="fin-stat-title">Monthly Return</span>
                  <span className="fin-stat-val fin-text-green">+2.4%</span>
                </div>
                <div className="fin-dash-stat">
                  <span className="fin-stat-title">Savings APY</span>
                  <span className="fin-stat-val">5.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / LOGOS */}
      <section className="fin-trust">
        <div className="fin-trust-inner">
          <p className="fin-trust-label">Backed by industry leaders</p>
          <div className="fin-trust-logos">
            {logos.map((l) => (
              <span key={l} className="fin-trust-logo">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="fin-products">
        <div className="fin-section-header">
          <div className="fin-tag">Our Products</div>
          <h2 className="fin-h2">
            Every tool you need,<br />
            <span className="fin-italic-serif">nothing you don't.</span>
          </h2>
          <p className="fin-sub">Three flagship products. One unified platform. Built for people who take their money seriously.</p>
        </div>

        <div className="fin-products-grid">
          {products.map((p, i) => (
            <div key={i} className={`fin-card fin-product-card ${p.featured ? 'fin-featured-product' : ''}`}>
              <div className="fin-icon-wrapper">{p.icon}</div>
              <h3 className="fin-product-title">{p.name}</h3>
              <p className="fin-product-desc">{p.desc}</p>

              <div className="fin-divider"></div>

              <ul className="fin-feature-list">
                {p.features.map(f => (
                  <li key={f}>
                    <svg className="fin-check" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button className="fin-link-btn">
                Explore {p.name} <span className="fin-arr">→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="fin-stats">
        <div className="fin-stats-container">
          <div className="fin-stats-info">
            <div className="fin-tag">By the Numbers</div>
            <h2 className="fin-h2">Trusted at <br /><span className="fin-italic-serif">scale.</span></h2>
            <p className="fin-sub">Millions of users. Billions under management. Uptime you can bank on.</p>
          </div>
          <div className="fin-stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="fin-stat-box">
                <div className="fin-stat-number">
                  {s.num}<span className="fin-stat-suffix">{s.suffix}</span>
                </div>
                <div className="fin-stat-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="fin-how">
        <div className="fin-section-header">
          <div className="fin-tag">How It Works</div>
          <h2 className="fin-h2">Up and running <br /><span className="fin-italic-serif">in minutes.</span></h2>
          <p className="fin-sub">No branch visits. No paperwork. No complexity. Just a better financial life.</p>
        </div>

        <div className="fin-steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="fin-step-card">
              <div className="fin-step-number">{s.num}</div>
              <h3 className="fin-step-title">{s.title}</h3>
              <p className="fin-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="fin-testi">
        <div className="fin-section-header">
          <div className="fin-tag">Customer Stories</div>
          <h2 className="fin-h2">Loved by the <br /><span className="fin-italic-serif">financially bold.</span></h2>
        </div>

        <div className="fin-testi-masonry">
          {testimonials.map((t, i) => (
            <div key={i} className={`fin-card fin-testi-box ${t.large ? 'fin-testi-large' : ''}`}>
              <div className="fin-quote-mark">“</div>
              <p className="fin-testi-text">{t.text}</p>
              <div className="fin-author">
                <div className="fin-avatar">{t.initials}</div>
                <div className="fin-author-info">
                  <div className="fin-author-name">{t.name}</div>
                  <div className="fin-author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="fin-pricing">
        <div className="fin-section-header">
          <div className="fin-tag">Pricing</div>
          <h2 className="fin-h2">Simple, <span className="fin-italic-serif">honest</span> pricing.</h2>
          <p className="fin-sub">Start free. Upgrade when you're ready. No hidden fees, ever.</p>
        </div>

        <div className="fin-pricing-grid">
          {plans.map((p, i) => (
            <div key={i} className={`fin-card fin-price-card ${p.featured ? 'fin-price-featured' : ''}`}>
              {p.badge && <div className="fin-popular-badge">{p.badge}</div>}

              <div className="fin-plan-name">{p.plan}</div>
              <div className="fin-plan-price">
                {p.price}
                {p.plan !== "Custom" && <span className="fin-price-period">{p.period}</span>}
              </div>
              {p.plan === "Custom" && <div className="fin-price-period fin-mt">{p.period}</div>}

              <div className="fin-divider"></div>

              <ul className="fin-feature-list">
                {p.features.map(f => (
                  <li key={f}>
                    <svg className="fin-check" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button className={`fin-plan-btn ${p.featured ? 'fin-plan-btn-primary' : 'fin-plan-btn-secondary'}`}>
                {p.plan === 'Private' ? 'Talk to sales' : 'Get started'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="fin-cta">
        <div className="fin-card fin-cta-box">
          <h2 className="fin-h2">Ready to upgrade your <br /><span className="fin-italic-serif">finances?</span></h2>
          <p className="fin-sub fin-cta-sub">Join over 1.2 million people who have already made the switch to smarter, more rewarding banking.</p>
          <div className="fin-actions fin-center">
            <button className="fin-btn-primary">Open your free account</button>
          </div>
          <div className="fin-trust-badges">
            <span>🔒 256-bit encryption</span>
            <span>✦ RBI registered</span>
            <span>⚡ Instant setup</span>
          </div>
        </div>
      </section>

    </div>
  );
}