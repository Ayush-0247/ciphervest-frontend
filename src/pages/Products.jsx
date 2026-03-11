import { useEffect } from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";
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
    icon: "🪙",
    name: "Crypto Investment Desk",
    desc: "Strategic cryptocurrency investment services with market research, risk management, and long-term digital asset portfolio planning.",
    features: [
      "Bitcoin, Ethereum & major altcoin strategies",
      "Market analysis & trade signals",
      "Portfolio diversification guidance",
      "Secure asset custody advisory"
    ],
    featured: false,
  },
  {
    icon: "📊",
    name: "Equity Market Advisory",
    desc: "Professional stock market guidance designed to help investors navigate domestic and global equity markets with confidence.",
    features: [
      "NSE & global stock market insights",
      "Short-term and long-term trade strategies",
      "Technical & fundamental research",
      "Sector-based investment opportunities"
    ],
    featured: true,
  },
  {
    icon: "💼",
    name: "Portfolio Management",
    desc: "End-to-end portfolio construction and monitoring to help investors grow wealth through diversified, data-driven strategies.",
    features: [
      "Personalized asset allocation",
      "Risk management frameworks",
      "Quarterly portfolio rebalancing",
      "Performance analytics & reporting"
    ],
    featured: false,
  },
];

const steps = [
  {
    num: "01",
    title: "Create Your Account",
    desc: "Sign up in under 2 minutes. No paperwork, no branch visits — just your phone and a few details to get started."
  },
  {
    num: "02",
    title: "Build Your Profile",
    desc: "Tell us your goals — saving, growing wealth, or entering crypto. We tailor everything to where you are financially right now."
  },
  {
    num: "03",
    title: "Get Your Strategy",
    desc: "We craft a personalized mix of crypto assets, equities, and smart payment tools designed to grow with your lifestyle."
  },
  {
    num: "04",
    title: "Track & Level Up",
    desc: "Watch your money move in real time. Our advisors keep optimizing your portfolio so you stay ahead — not just afloat."
  },
];
const stats = [
  { num: "₹36", suffix: "K+", desc: "Assets managed across client portfolios" },
  { num: "11+", suffix: "", desc: "Active investors using our advisory services" },
  { num: "15+", suffix: "", desc: "Markets tracked including crypto & global equities" },
  { num: "96", suffix: "%", desc: "Client satisfaction across advisory services" },
];

const testimonials = [
  {
    text: "Their crypto and equity strategies helped me diversify my investments and achieve consistent returns.",
    name: "Rohit Sharma",
    role: "Entrepreneur, Patna",
    initials: "RS",
    large: true,
  },
  {
    text: "The portfolio advisory service simplified investing for me. Everything is structured and transparent.",
    name: "Piyush Kumar",
    role: "Startup Founder, Delhi",
    initials: "PK",
    large: false,
  },
  {
    text: "Their tax planning insights helped me legally reduce my capital gains tax significantly.",
    name: "Amit Verma",
    role: "Transportation Businessman, Gorakhpur",
    initials: "AV",
    large: false,
  },
];

const plans = [
  {
    plan: "Starter",
    price: "₹0",
    period: "Basic access",
    features: [
      "Market insights & newsletters",
      "Basic crypto & stock updates",
      "Limited advisory support",
      "Educational resources"
    ],
    featured: false,
  },
  {
    plan: "Pro Advisory",
    price: "₹1999",
    period: "per month",
    features: [
      "Full crypto & equity advisory",
      "Personalized portfolio strategies",
      "Trade signals & research reports",
      "Tax planning insights",
      "Priority support"
    ],
    featured: true,
    badge: "Most Popular",
  },
  {
    plan: "Private Wealth",
    price: "Custom",
    period: "For HNIs & institutions",
    features: [
      "Dedicated relationship manager",
      "Custom investment mandates",
      "Advanced tax structuring",
      "Private investment opportunities",
      "Portfolio analytics dashboard"
    ],
    featured: false,
  },
];
const logos = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "NSE India",
  "BSE India",
  "Binance",
  "Coinbase",
  "WazirX",
  "Zerodha",
  
];

// ─── MAIN COMPONENT ───
export default function ProductPage() {
  // Removed IntersectionObserver (useReveal) to ensure 100% visibility 
  // and fix scrolling/visibility bugs caused by components failing to appear.

    const navigate = useNavigate();
  
    const goToContactus = () => {
      navigate("/contact");
    };
  
    const goToOutmoto = () => {
      navigate("/outmoto");
    };

    const gotomarket = () => {
      navigate("/dashboard");
    }
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
              Build wealth through <br />
              <span className="fin-italic-serif"> smarter investments.</span>
            </h1>

            <p className="fin-subtitle">
              A modern investment platform combining crypto markets, stock trading insights,
portfolio management, and tax advisory to help investors grow wealth with confidence.
            </p>

            <div className="fin-actions">
              <button onClick={goToContactus} className="fin-btn-primary">Drop a query</button>
              <button onClick={goToOutmoto} className="fin-btn-secondary">
                Know about us <span className="fin-arr">→</span>
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
              <div className="fin-dash-balance">₹31,200</div>
              <div className="fin-dash-change">
                <span className="fin-trend-up">▲</span> +₹3,800 (12.0%) this year
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
{/* TRUST / LOGOS */}
<section className="fin-trust">
  <div className="fin-trust-inner">
    <p className="fin-trust-label">Connected to leading financial ecosystems</p>

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

              <button
              onClick={gotomarket}
              className="fin-link-btn">
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

      <h2 className="fin-h2">
        Performance at <br />
        <span className="fin-italic-serif">scale.</span>
      </h2>

      <p className="fin-sub">
        Trusted by investors seeking disciplined strategies across crypto markets,
        equities, and diversified portfolios.
      </p>
    </div>

    <div className="fin-stats-grid">
      {stats.map((s, i) => (
        <div key={i} className="fin-stat-box">
          <div className="fin-stat-number">
            {s.num}
            <span className="fin-stat-suffix">{s.suffix}</span>
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

              <button
              onClick={goToContactus}
              className={`fin-plan-btn ${p.featured ? 'fin-plan-btn-primary' : 'fin-plan-btn-secondary'}`}>
                {p.plan === 'Private' ? 'Talk to sales' : 'Get started'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
{/* CTA */}
<section className="fin-cta">
  <div className="fin-card fin-cta-box">
    <h2 className="fin-h2">
      Ready to grow your <br />
      <span className="fin-italic-serif">investments?</span>
    </h2>

    <p className="fin-sub fin-cta-sub">
      Start your journey with expert guidance across crypto markets,
      global equities, portfolio management, and tax-efficient investment strategies.
    </p>

    <div className="fin-actions fin-center">
      <button 
      onClick={goToContactus}
      className="fin-btn-primary">Start Your Journey with Ciphervest</button>
    </div>

    <div className="fin-trust-badges">
      <span>🔒 Secure financial infrastructure</span>
      <span>📊 Data-driven investment strategies</span>
      <span>⚡ Expert advisory support</span>
    </div>
  </div>
</section>

    </div>
  );
}