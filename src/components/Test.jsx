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
          Power{' '}
          <span className="emoji-badge">📈</span>
          {' '}Your Wealth<br />
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

      {/* ── CARDS ── */}
      <div className="cards-grid">

        {/* Card 1: Expense Tracker */}
        <div className="card card-tracker">
          <p className="card-title">Understand Your Money Better</p>
          <p className="card-subtitle">Track Income and expense at a glance.</p>

          <DonutChart />

          <div className="expense-row">
            <div className="expense-tag">
              <div className="expense-dot dot-dark">60%</div>
              <span className="expense-name">Rent &amp; Living</span>
            </div>
            <span className="expense-amount">$4,140</span>
          </div>
          <div className="expense-row">
            <div className="expense-tag">
              <div className="expense-dot dot-purple">30%</div>
              <span className="expense-name">Shopping</span>
            </div>
            <span className="expense-amount">$4,140</span>
          </div>
          <div className="expense-row">
            <div className="expense-tag">
              <div className="expense-dot dot-light">10%</div>
              <span className="expense-name">Kids &amp; Education</span>
            </div>
            <span className="expense-amount">$4,140</span>
          </div>
        </div>

        {/* Card 2: Credit Card */}
        <div className="card card-credit">
          <div className="mastercard-icon">
            <div className="mc-circle mc-red" />
            <div className="mc-circle mc-yellow" />
          </div>

          <p className="credit-label">Available Balance</p>
          <p className="credit-balance">$48,092</p>

          <p className="credit-number">**** **** **** 4848</p>

          <div className="credit-footer">
            <div>
              <p className="credit-field-label">Card holder</p>
              <p className="credit-field-value">Gillian Peter</p>
            </div>
            <div>
              <p className="credit-field-label">Expiry Date</p>
              <p className="credit-field-value">12/30</p>
            </div>
          </div>
        </div>

        {/* Card 3: Save Widget */}
        <div className="card card-save">
          <p className="card-title">Save Smarter, Live Better</p>
          <p className="card-subtitle">Easily split your money into custom pockets</p>

          <div className="amount-input-wrapper">
            <span className="currency-sign">$</span>
            <span className="amount-input-display">|00.00</span>
          </div>
          <p className="amount-range">
            min <span>18.00 USD</span> &nbsp; max <span>500,000.00 USD</span>
          </p>

          <div className="select-field">
            <div className="select-left">
              <span className="select-icon">💳</span>
              <span>*****887</span>
            </div>
            <span className="chevron">▾</span>
          </div>

          <div className="select-field">
            <div className="select-left">
              <span className="select-icon">✈️</span>
              <span>Travel &amp; Tour</span>
            </div>
            <span className="chevron">▾</span>
          </div>

          <button className="btn-save">Save Now</button>
        </div>

      </div>

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