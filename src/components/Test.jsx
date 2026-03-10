import React from "react";

import { FaChartLine } from "react-icons/fa";
import './Test.css';


/* ── Donut Chart (SVG half-circle) ── */
const DonutChart = () => {
  const cx = 65, cy = 65, r = 55;
  // Half-circle donut using SVG arc paths
  const toRad = (deg) => (deg * Math.PI) / 180;
  const polarToCartesian = (angle) => ({
    x: cx + r * Math.cos(toRad(angle)),
    y: cy + r * Math.sin(toRad(angle)),
  });

  // Segments: dark 60%, purple 30%, light 10% — spread over 180deg (−180 to 0)
  const segments = [
    { color: '#1a1a1a', startDeg: -180, endDeg: -72, label: '60%' },
    { color: '#8b5cf6', startDeg: -72, endDeg: 18, label: '30%' },
    { color: '#d8b4fe', startDeg: 18, endDeg: 0, label: '10%' },
  ];

  const arcPath = (startDeg, endDeg, outerR, innerR) => {
    const start = polarToCartesian(startDeg);
    const end = polarToCartesian(endDeg);
    const startIn = {
      x: cx + innerR * Math.cos(toRad(startDeg)),
      y: cy + innerR * Math.sin(toRad(startDeg)),
    };
    const endIn = {
      x: cx + innerR * Math.cos(toRad(endDeg)),
      y: cy + innerR * Math.sin(toRad(endDeg)),
    };
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `
      M ${start.x} ${start.y}
      A ${outerR} ${outerR} 0 ${largeArc} 1 ${end.x} ${end.y}
      L ${endIn.x} ${endIn.y}
      A ${innerR} ${innerR} 0 ${largeArc} 0 ${startIn.x} ${startIn.y}
      Z
    `;
  };

  return (
    <div className="donut-wrapper">
      <svg className="donut-svg" viewBox="10 10 110 60">
        {segments.map((seg, i) => (
          <path
            key={i}
            d={arcPath(seg.startDeg, seg.endDeg, 55, 38)}
            fill={seg.color}
          />
        ))}
      </svg>
      <div className="donut-center">
        <span className="donut-label">Total Expenses:</span>
        <span className="donut-amount">$ 4,140</span>
      </div>
    </div>
  );
};

/* ── Avatar placeholder (uses emoji/gradient since no real images) ── */
const avatarColors = ['#f472b6', '#fb923c', '#60a5fa', '#34d399'];
const avatarEmojis = ['👩', '👨', '👩🏾', '🧔'];

const Avatar = ({ index }) => (
  <div className="avatar" style={{ background: avatarColors[index] }}>
    <span>{avatarEmojis[index]}</span>
  </div>
);

/* ── Main Component ── */
export default function WealthPlanner() {
  return (
    <div className="wealth-page">

      {/* ── HERO ── */}
      <section className="hero">
        <h1 className="hero-title">
          Power Your Wealth<br />
          with Smart Planning
        </h1>
        <p className="hero-subtitle">
          Take control of your money with simple tools to track spending, manage
          budgets, and build savings all in one place.
        </p>
        <div className="btn-group">
          <button className="btn-primary">Get Started Now</button>
          <button className="btn-secondary">Watch Demo</button>
        </div>
      </section>

<section className="preview-section">

  <div className="preview-wrapper">





    {/* ───────── PHONE 1 ───────── */}
    <div className="phone">
      <div className="notch"></div>

<div className="screen">

  <div className="screen-header">
    <span>9:41</span>
    <span>📶 🔋</span>
  </div>

  <div className="screen-content">

    <div className="market-pill">
      <span>🔥 Trending</span>
      <span className="green">BTC +2.4%</span>
    </div>

    <h2>Buy & Sell Crypto</h2>

    <div className="live-price">
      <h3>$42,518.21</h3>
      <span className="green">+1,245.33 (2.9%)</span>
    </div>

    <div className="mini-chart">
      <div className="line"></div>
    </div>

    <div className="quick-actions">
      <button>Buy</button>
      <button>Sell</button>
      <button>Convert</button>
    </div>

    <div className="feature-list">
      <div>⚡ Instant Execution</div>
      <div>🔐 Cold Wallet Security</div>
      <div>📊 Real-Time Charts</div>
    </div>

  </div>

  <button className="primary-btn">Open Trading Account</button>

</div>


    </div>






    {/* ───────── PHONE 2 ───────── */}
    <div className="phone">
      <div className="notch"></div>

      <div className="screen">

  <div className="screen-header">
    <span>Portfolio</span>
    <span className="green">+3.18%</span>
  </div>

  <h2 className="balance">$12,854.40</h2>
  <p className="small">+$427.12 this week</p>

  <div className="portfolio-stats">
    <div>
      <strong>Assets</strong>
      <span>8 Coins</span>
    </div>
    <div>
      <strong>Risk</strong>
      <span>Moderate</span>
    </div>
  </div>

  <div className="bar-chart">
    <div className="bar h1"></div>
    <div className="bar h2"></div>
    <div className="bar h3"></div>
    <div className="bar h4"></div>
    <div className="bar h5"></div>
  </div>

  <div className="wallet-actions">
    <button className="dark-btn">Deposit</button>
    <button className="light-btn">Withdraw</button>
  </div>

  <div className="asset">
    <div>
      <strong>Bitcoin</strong>
      <p className="small">0.45 BTC</p>
    </div>
    <span className="green">$24,520</span>
  </div>

  <div className="asset">
    <div>
      <strong>Ethereum</strong>
      <p className="small">3.2 ETH</p>
    </div>
    <span>$1,650</span>
  </div>

  

</div>


    </div>


    {/* ───────── PHONE 3 ───────── */}
    <div className="phone3">
      <div className="phone">
      <div className="notch"></div>

      <div className="screen">

        <div className="screen-header">
          <span>Smart Save</span>
          <span>💰</span>
        </div>

        <h2>Create Saving Goals</h2>
        <p className="subtitle">
          Split funds into automated pockets and grow wealth faster.
        </p>

        <div className="goal-box">
          <div>
            <strong>Travel Fund</strong>
            <span>₹1,20,000 / ₹3,00,000</span>
          </div>
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
        </div>

        <div className="goal-box">
          <div>
            <strong>Emergency</strong>
            <span>₹40,000 / ₹1,00,000</span>
          </div>
          <div className="progress-bar">
            <div className="progress two"></div>
          </div>
        </div>

        <button className="primary-btn">Add Goal</button>

      </div>
    </div>
    </div>
    

  </div>

</section>

      {/* ── TRUST BAR ── */}
      <div className="trust-bar">
        <div className="trust-section">
          <span className="trust-label">Trusted Partners</span>
          <div className="avatars">
            {[0, 1, 2, 3].map((i) => <Avatar key={i} index={i} />)}
          </div>
        </div>

        <div className="trust-section">
          <span className="rating-text">Rated Excellent: 5/5</span>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="star">★</span>
            ))}
          </div>
        </div>
      </div>








    </div>
  );
}