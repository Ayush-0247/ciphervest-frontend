import React, { useState, useEffect, useRef } from "react";
import "./Ourmoto.css";
import { useNavigate } from "react-router-dom";

// ─── Data ─────────────────────────────────────────────────────────────────────

const mottos = [
  {
    id: 1,
    icon: "◈",
    tagline: "PRINCIPLE 01",
    title: "Security Is the Foundation of Wealth",
    body: "From cold-storage crypto vaults to institutional-grade equity execution, every transaction is fortified with layered encryption, compliance monitoring, and real-time risk control. Capital is protected before it is multiplied.",
    accent: "trust",
  },
  {
    id: 2,
    icon: "⬡",
    tagline: "PRINCIPLE 02",
    title: "All Markets. One Intelligent Core.",
    body: "Crypto, global equities, structured assets, and alternative investments — unified under a single intelligent system. We eliminate fragmentation so your portfolio moves as one cohesive strategy, not scattered positions.",
    accent: "clarity",
  },
  {
    id: 3,
    icon: "◉",
    tagline: "PRINCIPLE 03",
    title: "Advisory Backed by Data, Not Hype",
    body: "Our financial advisory and tax strategies are driven by analytics, regulatory insight, and macro modeling — not speculation. We align every recommendation with long-term wealth architecture, not short-term noise.",
    accent: "bold",
  },
  {
    id: 4,
    icon: "⬟",
    tagline: "PRINCIPLE 04",
    title: "Global Assets. Local Intelligence.",
    body: "Whether navigating Indian capital gains, U.S. equities, or decentralized protocols, our infrastructure adapts to jurisdictional compliance, taxation, and reporting standards — so growth never clashes with regulation.",
    accent: "global",
  },
];

const TEAM = [
  {
    name: "Arjun Mehta",
    role: "CEO & Co-Founder",
    bio: "Former Goldman Sachs VP. Built cross-border payment rails across 40+ markets over 15 years.",
    initials: "AM",
    tags: [{ label: "Strategy", variant: "blue" }, { label: "Payments" }],
    dark: true,
    verified: true,
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Priya Kapoor",
    role: "Chief Technology Officer",
    bio: "Ex-Stripe engineering lead. Scaled infrastructure to 10M+ daily transactions with 99.99% uptime.",
    initials: "PK",
    tags: [{ label: "Engineering", variant: "blue" }, { label: "Scale" }],
    verified: true,
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Marcus Selin",
    role: "Head of Risk & Compliance",
    bio: "14 years navigating regulatory frameworks across EU, US and APAC fintech corridors.",
    initials: "MS",
    tags: [{ label: "Compliance", variant: "amber" }, { label: "Risk" }],
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Léa Fontaine",
    role: "Chief Product Officer",
    bio: "Designer-turned-PM from Revolut & Wise. Products she shipped are used by 8M+ consumers.",
    initials: "LF",
    tags: [{ label: "Product", variant: "blue" }, { label: "UX" }],
    linkedin: "#",
    twitter: "#",
  },
];

// ─── Icons ─────────────────────────────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.766l7.73-8.835L2.018 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 10 10"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="1.5,5.5 4,8 8.5,2" />
    </svg>
  );
}

// ─── TeamCard  (defined OUTSIDE Outmoto — never re-create on each render) ──────

function TeamCard({ member }) {
  const tagClass = (variant) => {
    if (variant === "blue") return "ct-tag ct-tag-blue";
    if (variant === "amber") return "ct-tag ct-tag-amber";
    return "ct-tag";
  };

  return (
    <article className={`ct-card${member.dark ? " ct-card-dark" : ""}`}>
      {/* Avatar */}
      <div className="ct-avatar-wrap">
        <div className="ct-avatar-ring">
          <span className="ct-initials">{member.initials}</span>
        </div>
        <div className="ct-overlay" />
        <div className="ct-socials">
          <a href={member.linkedin} className="ct-social-btn" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href={member.twitter} className="ct-social-btn" aria-label="X / Twitter">
            <XIcon />
          </a>
        </div>
      </div>

      {/* Body */}
      <div className="ct-body">
        <div className="ct-name-row">
          <h3 className="ct-name">{member.name}</h3>
          {member.verified && (
            <span className="ct-badge" aria-label="Verified">
              <CheckIcon />
            </span>
          )}
        </div>
        <p className="ct-role">{member.role}</p>
        <div className="ct-divider" />
        <p className="ct-bio">{member.bio}</p>
        <div className="ct-tags">
          {member.tags.map((t) => (
            <span key={t.label} className={tagClass(t.variant)}>
              {t.label}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function Outmoto() {
  const [visibleCards, setVisibleCards] = useState([]);
  const [heroVisible, setHeroVisible] = useState(false);
  const [ticker, setTicker] = useState(0);

  const cardRefs = useRef([]);
  const heroRef = useRef(null);

  const navigate = useNavigate();

  const goToContact = () => {
    navigate("/contact");
  };

  useEffect(() => {
    // Hero observer
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeroVisible(true);
      },
      { threshold: 0.2 }
    );
    if (heroRef.current) heroObserver.observe(heroRef.current);

    // Card observer
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleCards((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.25 }
    );
    cardRefs.current.forEach((ref) => {
      if (ref) cardObserver.observe(ref);
    });

    // Ticker animation
    const interval = setInterval(() => {
      setTicker((prev) => (prev + 1) % 40);
    }, 80);

    return () => {
      heroObserver.disconnect();
      cardObserver.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="motto-page">
      {/* Background */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-orb orb-1" aria-hidden="true" />
      <div className="bg-orb orb-2" aria-hidden="true" />

      {/* ── Hero ────────────────────────────────────── */}
      <div
        className={`motto-hero ${heroVisible ? "visible" : ""}`}
        ref={heroRef}
      >
        <div className="hero-eyebrow">
          <span className="dot-blink" /> OUR PHILOSOPHY
        </div>

        <h1 className="hero-title">
          <span className="title-line">Finance,</span>
          <span className="title-line accent-text">Reimagined.</span>
        </h1>

        <p className="hero-sub">
          We don't move money. We move possibilities. Every feature, every
          decision, every line of code is written against one measure — does
          this make financial freedom more accessible?
        </p>

        <div className="hero-divider">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className={`tick ${ticker === i ? "active" : ""}`} />
          ))}
        </div>

        <button className="contactBtn" onClick={goToContact}>
          Get in touch with us
        </button>
      </div>

      {/* ── Motto Cards ─────────────────────────────── */}
      <div className="motto-grid">
        {mottos.map((m, index) => (
          <article
            key={m.id}
            className={`motto-card ${m.accent} ${
              visibleCards.includes(index) ? "visible" : ""
            }`}
            data-index={index}
            ref={(el) => (cardRefs.current[index] = el)}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className="card-icon">{m.icon}</div>
            <div className="card-tag">{m.tagline}</div>
            <h2 className="card-title">{m.title}</h2>
            <p className="card-body">{m.body}</p>
            <div className="card-line" />
          </article>
        ))}
      </div>

      {/* ── Manifesto ───────────────────────────────── */}
      <div className="manifesto-strip">
        <p className="manifesto-quote">
          "We believe the most powerful financial tool ever built
          <em> should fit in your pocket</em> — and work for everyone."
        </p>
        <span className="manifesto-sig">— Founders, NovaPay</span>
      </div>

      {/* ── Who We Are ──────────────────────────────── */}
      <div className="who-wrapper">
        <div className="who-container">
          {/* Left */}
          <div className="who-left">
            <h1>Who we are</h1>
            <p className="who-description">
              In a fast-moving and increasingly complex global economy, our
              success depends on how faithfully we adhere to our core
              principles: delivering exceptional client service, acting with
              integrity and responsibility and supporting the growth of our
              employees.
            </p>
            <div className="who-columns">
              <div className="who-col">
                <h3>Our business</h3>
                <p>
                  We are a leading global fintech services firm with advanced
                  digital infrastructure and secure financial operations
                  worldwide.
                </p>
                <a href="#">LEARN MORE</a>
              </div>
              <div className="who-col">
                <h3>Global presence</h3>
                <p>
                  We serve clients across 60+ markets with a distributed
                  technology network and strategic global partnerships.
                </p>
                <a href="#">TAKE A LOOK</a>
              </div>
              <div className="who-col">
                <h3>Our history</h3>
                <p>
                  Built on innovation and transparency, we continue to redefine
                  digital finance through scalable technology.
                </p>
                <a href="#">EXPLORE HERE</a>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="who-right">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692"
              alt="Fintech professional"
            />
            <div className="impact-card">
              <span className="impact-label">CORPORATE RESPONSIBILITY</span>
              <h2>Our impact</h2>
              <span className="impact-date">November 04, 2024</span>
              <p>
                Powering financial inclusion by breaking barriers and enabling
                economic opportunities across emerging markets.
              </p>
              <a href="#">Read more</a>
            </div>
          </div>
        </div>
      </div>

     

      {/* ── Core Team ───────────────────────────────── */}
      <section className="ct-section">
        <div className="ct-blob-1" />
        <div className="ct-blob-2" />

        <div className="ct-container">
          <header className="ct-header">
            <div>
              <div className="ct-eyebrow">
                <span className="ct-eyebrow-line" />
                <span className="ct-eyebrow-text">The People Behind It</span>
              </div>
              <h2 className="ct-headline">
                Minds that move
                <br />
                <em>money forward</em>
              </h2>
            </div>

            <div className="ct-header-right">
              <p className="ct-desc">
                Our leadership blends deep financial expertise with engineering
                velocity — purpose-built to serve the next generation of global
                commerce.
              </p>
              <div className="ct-stats">
                <div>
                  <span className="ct-stat-num">60+</span>
                  <span className="ct-stat-label">Years experience</span>
                </div>
                <div>
                  <span className="ct-stat-num">3</span>
                  <span className="ct-stat-label">Continents covered</span>
                </div>
                <div>
                  <span className="ct-stat-num">$2B+</span>
                  <span className="ct-stat-label">Volume processed</span>
                </div>
              </div>
            </div>
          </header>

          <div className="ct-grid">
            {TEAM.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>

          <footer className="ct-footer">
            <p className="ct-footer-text">
              <strong>We're hiring.</strong>&nbsp; Join a team rewriting the
              rules of global finance.
            </p>
            <a href="#" className="ct-cta">
              View open roles <span className="ct-cta-arrow">→</span>
            </a>
          </footer>
        </div>
      </section>
    </section>
  );
}