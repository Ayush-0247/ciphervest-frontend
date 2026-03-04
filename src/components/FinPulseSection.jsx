import React from "react";
import "./FinPulseSection.css";

export default function FinPulseSection() {
  return (
    <section className="fp-wrapper">
      <div className="fp-overlay"></div>

      <div className="fp-container">
        {/* LEFT CONTENT */}
        <div className="fp-left">
          <p className="fp-brand-sub">QuantEdge Analytics</p>

          <h1 className="fp-brand-title">
            Capital <span>Signals</span>
          </h1>

          <p className="fp-tagline">
            Institutional-grade intelligence for crypto, equities, and macro
            capital flows.
          </p>

          <div className="fp-buttons">
            <a href="#" className="fp-btn primary">
              Explore Research
            </a>
            <a href="#" className="fp-btn secondary">
              Book Consultation
            </a>
          </div>

          {/* TRUST LOGOS */}
      
        </div>

        {/* RIGHT SIDE */}
        <div className="fp-right">
          <img
            className="fp-hero-img"
           src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80"
            alt="Fintech dashboard"
          />

          <div className="fp-card">
            <h2 className="fp-main-heading">
              Where Is Global FinTech Capital Flowing Next?
            </h2>

            <p className="fp-summary">
              We decode macro liquidity cycles, AI-driven strategies, digital
              asset integration, and regulatory momentum to deliver
              forward-looking capital intelligence for modern investors.
            </p>

            <ul className="fp-features">
              <li>AI-Enhanced Market Signals</li>
              <li>Cross-Asset Flow Tracking</li>
              <li>Institutional Risk Intelligence</li>
              <li>Crypto & Equity Strategy Insights</li>
            </ul>

            <a href="#" className="fp-link">
              Read Full Market Brief →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
