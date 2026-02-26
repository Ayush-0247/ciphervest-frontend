import React from "react";
import "./FinPulseSection.css";

export default function FinPulseSection() {
  return (
    <section className="fp-wrapper">
      <div className="fp-left">
        <p className="fp-brand-sub">QuantEdge Analytics</p>
        <h1 className="fp-brand-title">
          Capital <span>Signals</span>
        </h1>

        <div className="fp-audio-bars">
          <div className="fp-bar fp-b1"></div>
          <div className="fp-bar fp-b2"></div>
          <div className="fp-bar fp-b3"></div>
          <div className="fp-bar fp-b4"></div>
          <div className="fp-bar fp-b5"></div>
          <div className="fp-bar fp-b6"></div>
        </div>
      </div>

      <div className="fp-right">
        <p className="fp-episode-time">🎙 00:21:10</p>

        <h2 className="fp-main-heading">
          Expansion or Pullback: Where Is FinTech Capital Flowing Next?
        </h2>

        <a href="#" className="fp-link">
          Browse all market briefings
        </a>

        <p className="fp-summary">
          As digital finance continues to evolve, investors are navigating
          liquidity shifts, AI-driven trading systems, decentralized finance
          growth, and regulatory transformation. Our research desk examines
          macro indicators, fintech earnings resilience, and global capital
          rotation trends shaping the next phase of innovation-led markets.
        </p>

        <div className="fp-actions">
          <button className="fp-play-btn">▶</button>
          <a href="#" className="fp-transcript">
            VIEW TRANSCRIPT
          </a>
        </div>
      </div>
    </section>
  );
}