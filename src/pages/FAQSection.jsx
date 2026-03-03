import { useState, useMemo } from "react";
import styles from "./FAQSection.module.css";
import { useNavigate } from "react-router-dom";
/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const ALL_FAQS = [
  {
    category: "Crypto & Digital Assets",
    icon: "◈",
    slug: "crypto",
    items: [
      {
        q: "What cryptocurrencies can I trade on your platform?",
        a: "We support 200+ cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and all major altcoins. Our platform provides real-time price feeds, advanced charting, and institutional-grade execution across spot and derivatives markets.",
      },
      {
        q: "How is my crypto portfolio secured?",
        a: "Your assets are protected by multi-signature cold storage, AES-256 encryption, and biometric authentication. We maintain a dedicated insurance fund covering up to $500,000 per account, with 95% of assets held in air-gapped cold wallets.",
      },
      {
        q: "Can I set up automated crypto trading strategies?",
        a: "Yes. Our algo-trading suite lets you deploy DCA strategies, grid bots, and custom rule-based triggers. API access is available for developers who want to integrate their own quantitative models.",
      },
    ],
  },
  {
    category: "Stocks & Equities",
    icon: "▲",
    slug: "stocks",
    items: [
      {
        q: "Do you offer fractional share investing?",
        a: "Yes. You can invest in any listed stock from as little as ₹10. Fractional investing gives you exposure to high-value stocks like Apple, Google, and Tesla without needing to buy a full share, enabling truly diversified portfolios at any budget.",
      },
      {
        q: "What markets do you provide access to?",
        a: "We offer access to NSE, BSE, NYSE, NASDAQ, LSE, and 15 other global exchanges. Pre-market and after-hours trading are available for US markets, with zero commission on your first 30 trades monthly.",
      },
      {
        q: "How does your stock screener work?",
        a: "Our screener filters across 50+ fundamental and technical parameters — P/E ratio, RSI, MACD, EPS growth, insider activity, and more. You can save custom screens and receive alerts when stocks enter your criteria.",
      },
    ],
  },
  {
    category: "Capital Investment",
    icon: "◉",
    slug: "capital",
    items: [
      {
        q: "What capital investment products do you offer?",
        a: "We offer PMS (Portfolio Management Services), AIFs (Alternative Investment Funds), structured products, sovereign gold bonds, REITs, InvITs, and curated private equity opportunities. Minimum tickets vary by product from ₹10 lakh to ₹1 crore.",
      },
      {
        q: "Who is eligible for capital investment advisory?",
        a: "Our capital investment services are available to HNIs, family offices, and institutional investors. Retail investors can access curated fund-of-funds starting at lower ticket sizes through our wealth platform.",
      },
    ],
  },
  {
    category: "Portfolio Management",
    icon: "⬡",
    slug: "portfolio",
    items: [
      {
        q: "How does your AI-driven portfolio management work?",
        a: "Our proprietary engine analyzes 40+ risk parameters, macroeconomic indicators, and your personal risk profile to construct and rebalance your portfolio. It monitors market conditions 24/7 and automatically hedges against volatility using derivatives strategies.",
      },
      {
        q: "Can I set custom investment goals?",
        a: "Absolutely. You can define goals like retirement planning, child's education, wealth preservation, or aggressive growth. The system maps your timeline and target corpus to a precise asset allocation strategy, adjusting dynamically as markets evolve.",
      },
      {
        q: "How often is my portfolio rebalanced?",
        a: "Rebalancing is triggered by threshold-based rules — when any asset class drifts more than 5% from its target allocation — or quarterly at minimum. You receive a detailed rebalancing report with rationale for every change made.",
      },
    ],
  },
  {
    category: "Tax & Advisory",
    icon: "✦",
    slug: "tax",
    items: [
      {
        q: "Do you provide crypto tax filing support?",
        a: "Yes — our tax module auto-tracks every trade, calculates short-term and long-term gains, applies TDS deductions, and generates ITR-compliant reports. We support all assessment years and integrate directly with the Income Tax portal.",
      },
      {
        q: "What does your financial advisory service cover?",
        a: "Our SEBI-registered advisors provide equity research, goal-based planning, insurance optimization, estate planning, and succession advisory. Every client gets a dedicated relationship manager backed by a team of sector specialists.",
      },
      {
        q: "How do you help with legal tax optimization?",
        a: "We identify legitimate deductions under Sections 80C, 80D, 54F, and HUF structuring. Our advisors design tax-efficient vehicles including ELSS funds, NPS contributions, and bond laddering to legally minimize your tax outgo every assessment year.",
      },
      {
        q: "Are your advisors SEBI-registered?",
        a: "Yes. All investment advisors on our platform are SEBI-registered (RIA category) and operate under strict fiduciary obligations. We never earn commissions on products we recommend — our fee model is entirely transparent and disclosed upfront.",
      },
    ],
  },
  {
    category: "Account & Security",
    icon: "⊛",
    slug: "account",
    items: [
      {
        q: "How do I open an account?",
        a: "KYC is fully digital and takes under 10 minutes. You'll need your PAN, Aadhaar, and a selfie. Once verified, your account is activated and linked to your bank within 24 hours. No physical paperwork required.",
      },
      {
        q: "What security measures protect my account?",
        a: "We enforce 2FA on all logins, device fingerprinting, IP whitelisting, and real-time anomaly detection. Withdrawals require a 24-hour cool-down period after a new bank account is added, protecting against unauthorized fund transfers.",
      },
      {
        q: "How do I withdraw funds?",
        a: "Withdrawals to linked bank accounts are processed within 1 business day for Indian accounts and 2–3 days for international accounts. There are no withdrawal fees. Crypto withdrawals clear in 30–90 minutes depending on network congestion.",
      },
    ],
  },
];

const NAV_LINKS = ["Services", "Markets", "Advisory", "FAQ", "Contact"];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function FAQPage() {
  const navigate = useNavigate();

  const gotocontactus = () => {
    navigate("/contact");   // Navigate to /about page
  };

  const [openItem, setOpenItem]       = useState(null);
  const [activeFilter, setFilter]     = useState("all");
  const [searchQuery, setSearch]      = useState("");

  const toggle = (id) => setOpenItem(openItem === id ? null : id);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ALL_FAQS
      .filter(cat => activeFilter === "all" || cat.slug === activeFilter)
      .map(cat => ({
        ...cat,
        items: cat.items.filter(
          item =>
            !q ||
            item.q.toLowerCase().includes(q) ||
            item.a.toLowerCase().includes(q)
        ),
      }))
      .filter(cat => cat.items.length > 0);
  }, [activeFilter, searchQuery]);

  const totalResults = filtered.reduce((s, c) => s + c.items.length, 0);

  return (
    <div className={styles.page}>

      
      {/* ── HERO ── */}
      <header className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGlow1} />
        <div className={styles.heroGlow2} />
        <div className={styles.heroGrid} />

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeDot} />
            Help Center · FAQ
          </div>
          <h1 className={styles.heroTitle}>
            Your Questions,<br />
            <span className={styles.heroAccent}>Answered.</span>
          </h1>
          <p className={styles.heroSub}>
            Explore everything about crypto, stocks, portfolio management,
            capital investment, and tax advisory in one place.
          </p>

          {/* Search Bar */}
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>⌕</span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search any question… e.g. crypto tax, portfolio rebalancing"
              value={searchQuery}
              onChange={e => setSearch(e.target.value)}
            />
            {searchQuery && (
              <button className={styles.searchClear} onClick={() => setSearch("")}>✕</button>
            )}
          </div>

          {/* Stats row */}
          <div className={styles.heroStats}>
            {[
              { val: "200+", label: "Assets Supported" },
              { val: "5",   label: "Global Markets" },
              { val: "24/7", label: "Advisory Access" },
              { val: "SEBI", label: "Registration ongoing" },
            ].map(s => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statVal}>{s.val}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroScroll}>
          <span className={styles.scrollDot} />
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className={styles.main}>

        {/* Category Filter Tabs */}
        <div className={styles.filterRow}>
          <div className={styles.filterInner}>
            <button
              className={`${styles.filterTab} ${activeFilter === "all" ? styles.filterActive : ""}`}
              onClick={() => setFilter("all")}
            >
              All Topics
            </button>
            {ALL_FAQS.map(cat => (
              <button
                key={cat.slug}
                className={`${styles.filterTab} ${activeFilter === cat.slug ? styles.filterActive : ""}`}
                onClick={() => setFilter(cat.slug)}
              >
                <span className={styles.filterIcon}>{cat.icon}</span>
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Meta */}
        <div className={styles.resultsMeta}>
          {searchQuery
            ? <span><strong>{totalResults}</strong> result{totalResults !== 1 ? "s" : ""} for "<em>{searchQuery}</em>"</span>
            : <span>Showing <strong>{totalResults}</strong> questions across <strong>{filtered.length}</strong> categories</span>
          }
        </div>

        {/* FAQ Accordion */}
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>◎</span>
            <p>No results found for "<strong>{searchQuery}</strong>"</p>
            <button className={styles.emptyReset} onClick={() => { setSearch(""); setFilter("all"); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className={styles.faqGrid}>
            {filtered.map((cat, ci) => (
              <div key={ci} className={styles.catBlock}>
                <div className={styles.catHeader}>
                  <span className={styles.catIcon}>{cat.icon}</span>
                  <span className={styles.catName}>{cat.category}</span>
                  <span className={styles.catCount}>{cat.items.length}</span>
                </div>

                {cat.items.map((item, ii) => {
                  const id = `${ci}-${ii}`;
                  const open = openItem === id;
                  return (
                    <div
                      key={ii}
                      className={`${styles.faqItem} ${open ? styles.faqOpen : ""}`}
                      onClick={() => toggle(id)}
                    >
                      <div className={styles.faqQ}>
                        <span className={styles.qText}>{item.q}</span>
                        <span className={styles.qToggle}>
                          <span className={styles.toggleIcon}>{open ? "−" : "+"}</span>
                        </span>
                      </div>
                      <div className={`${styles.faqA} ${open ? styles.faqAOpen : ""}`}>
                        <p>{item.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBg} />
          <div className={styles.ctaContent}>
            <div className={styles.ctaLeft}>
              <span className={styles.ctaBigIcon}>◎</span>
              <div>
                <h3 className={styles.ctaHeading}>Still have questions?</h3>
                <p className={styles.ctaDesc}>Our certified financial advisors are available around the clock.</p>
              </div>
            </div>
            <div className={styles.ctaActions}>
              <button onClick={gotocontactus} className={styles.btnGold}>Schedule a Call</button>
              <button onClick={gotocontactus} className={styles.btnOutline}>Live Chat</button>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
}