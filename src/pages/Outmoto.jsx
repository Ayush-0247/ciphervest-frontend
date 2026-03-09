import React, { useState, useEffect, useRef } from "react";
import "./Ourmoto.css";
import { useNavigate } from "react-router-dom";

// ─── Data ─────────────────────────────────────────────────────────────────────

const mottos = [
  {
    id: 1,
    icon: "◈",
    tagline: "PRINCIPLE 01",
    title: "Protect Capital Before Growing It",
    body: "True wealth begins with disciplined risk management. From diversified portfolios to secure crypto asset custody, every investment strategy we design begins with protecting capital before pursuing growth.",
    accent: "trust",
  },
  {
    id: 2,
    icon: "⬡",
    tagline: "PRINCIPLE 02",
    title: "One Portfolio. Multiple Markets.",
    body: "Modern wealth is no longer confined to one asset class. We combine equities, digital assets, and strategic allocations into one intelligent portfolio designed for resilience and long-term performance.",
    accent: "clarity",
  },
  {
    id: 3,
    icon: "◉",
    tagline: "PRINCIPLE 03",
    title: "Data-Driven Investment Strategy",
    body: "Our advisory is built on research, market analytics, and macroeconomic insights. Every recommendation is backed by data, not speculation or hype.",
    accent: "bold",
  },
  {
    id: 4,
    icon: "⬟",
    tagline: "PRINCIPLE 04",
    title: "Growth That Survives Taxation",
    body: "Investment returns are only meaningful when optimized for taxation. Our strategies integrate tax planning, regulatory compliance, and financial structuring to maximize net wealth.",
    accent: "global",
  },
];

const TEAM = [
  {
    name: "Ayush Raj",
    role: "Founder & Chief Technical Officer",
     bio: "Leads the firm's strategic growth, investment vision, and development of financial services across crypto, equities, and portfolio management.",
    initials: "AR",
    tags: [
      { label: "Strategy", variant: "blue" },
      { label: "Investments" }
    ],
    dark: true,
    verified: true,
linkedin: "https://www.linkedin.com/in/ayushraj2407",
    twitter: "#",
  },

  {
    name: "**************",
    role: "Chief Management Officer",
    bio: "Oversees operations and client experience, ensuring smooth execution of portfolio management and advisory services.",
    initials: "*",
    tags: [
      { label: "Operations", variant: "blue" },
      { label: "Management" }
    ],
    verified: true,
   linkedin: "https://www.linkedin.com/in/ayushraj2407",
    twitter: "#",
  },

  {
    name: "*****",
    role: "Public Relations Officer",
    bio: "Handles investor communication, partnerships, and public engagement to strengthen the firm's market presence.",
    initials: "*",
    tags: [
      { label: "Communications", variant: "amber" },
      { label: "Outreach" }
    ],
    verified: true,
   linkedin: "https://www.linkedin.com/in/ayushraj2407",
    twitter: "#",
  },

  {
    name: "****************",
    role: "Chief Financial Officer",
    bio: "Oversees financial planning, risk management, and tax-efficient investment strategies for client portfolios.",
    initials: "*",
    tags: [
      { label: "Finance", variant: "blue" },
      { label: "Risk" }
    ],
    verified: true,
 linkedin: "https://www.linkedin.com/in/ayushraj2407",
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
          <a
  href={member.linkedin}
  className="ct-social-btn"
  aria-label="LinkedIn"
  target="_blank"
  rel="noopener noreferrer"
>
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
         <span className="title-line">Wealth,</span>
<span className="title-line accent-text">Engineered.</span>
        </h1>

        <p className="hero-sub">
We help investors navigate the modern financial landscape — from global equities
to digital assets — through disciplined strategy, portfolio intelligence, and
tax-efficient wealth management.
</p>

        <div className="hero-divider">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className={`tick ${ticker === i ? "active" : ""}`} />
          ))}
        </div>

        <button className="contactBtnn" onClick={goToContact}>
          Get in touch with us
        </button>
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
            <a onClick={goToContact} className="contactBtnnforteam">
              Drop your info<span className="arrow">→</span>
            </a>
          </footer>
        </div>
      </section>

      
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
"We believe wealth is not created by chance —
<em> it is engineered through strategy, discipline, and intelligent investment.</em>"
</p>
<span className="manifesto-sig">— Founders</span>
      </div>

      {/* ── Who We Are ──────────────────────────────── */}
      <div className="who-wrapper">
        <div className="who-container">
          {/* Left */}
          <div className="who-left">
            <h1>Who we are</h1>
           <p className="who-description">
In today's rapidly evolving financial landscape, investors need more than
access to markets — they need strategy. Our firm combines expertise in
equities, digital assets, and tax planning to help clients build resilient,
future-ready portfolios.
</p>
            <div className="who-columns">
              <div className="who-col">
                <h3>Our business</h3>
                <p>
We specialize in crypto investments, stock trading, portfolio management,
and strategic financial advisory designed for long-term wealth creation.
</p>
                <a href="#">LEARN MORE</a>
              </div>
              <div className="who-col">
                <h3>Global presence</h3>
                <p>
Our investment strategies track global market opportunities while adapting
to regional taxation and regulatory frameworks.
</p>
                <a href="#">TAKE A LOOK</a>
              </div>
              <div className="who-col">
                <h3>Our history</h3>
              <p>
Built on research, discipline, and financial insight, our firm was created
to help investors navigate both traditional and digital markets with clarity.
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
Expanding financial literacy and enabling smarter investment decisions
through transparent advisory and responsible wealth management.
</p>
              <a href="#">Read more</a>
            </div>
          </div>
        </div>
      </div>

     


    </section>
  );
}