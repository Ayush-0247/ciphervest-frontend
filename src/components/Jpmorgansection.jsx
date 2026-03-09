import React, { useState } from 'react';
import styles from './Jpmorgansection.module.css';

const AssetManagementIcon = () => (
  <svg className={styles.cardIcon} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="4" y="20" width="32" height="16" />
    <rect x="10" y="14" width="20" height="6" />
    <rect x="15" y="8" width="10" height="6" />
    <line x1="4" y1="20" x2="36" y2="20" />
    <line x1="10" y1="36" x2="10" y2="20" />
    <line x1="20" y1="36" x2="20" y2="20" />
    <line x1="30" y1="36" x2="30" y2="20" />
  </svg>
);

const CommercialBankingIcon = () => (
  <svg className={styles.cardIcon} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4">
    <ellipse cx="20" cy="10" rx="16" ry="5" />
    <line x1="4" y1="10" x2="4" y2="32" />
    <line x1="36" y1="10" x2="36" y2="32" />
    <ellipse cx="20" cy="32" rx="16" ry="5" />
    <line x1="4" y1="21" x2="36" y2="21" />
  </svg>
);

const InvestmentBankingIcon = () => (
  <svg className={styles.cardIcon} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="6" y="14" width="8" height="22" />
    <rect x="16" y="8" width="8" height="28" />
    <rect x="26" y="18" width="8" height="18" />
    <line x1="4" y1="36" x2="36" y2="36" />
    <polyline points="8,10 16,4 26,12 34,6" />
  </svg>
);

const MarketsIcon = () => (
  <svg className={styles.cardIcon} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4">
    <line x1="8" y1="36" x2="8" y2="10" />
    <line x1="16" y1="36" x2="16" y2="16" />
    <line x1="24" y1="36" x2="24" y2="8" />
    <line x1="32" y1="36" x2="32" y2="20" />
    <line x1="6" y1="36" x2="34" y2="36" />
    <line x1="6" y1="10" x2="10" y2="10" />
    <line x1="14" y1="16" x2="18" y2="16" />
    <line x1="22" y1="8" x2="26" y2="8" />
    <line x1="30" y1="20" x2="34" y2="20" />
  </svg>
);

const PrivateBankingIcon = () => (
  <svg className={styles.cardIcon} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="20" cy="13" r="7" />
    <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14" />
    <line x1="20" y1="22" x2="20" y2="36" />
    <line x1="14" y1="29" x2="26" y2="29" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="5,2 11,8 5,14" />
  </svg>
);

const allCards = [
  {
    icon: <AssetManagementIcon />,
   title: "Crypto Trading",
    desc: "Execute digital asset trades with powerful analytics, real-time market data, and intelligent tools designed for modern crypto investors.",
  },
  {
    icon: <CommercialBankingIcon />,
    title: "Portfolio Management",
    desc: "Track and optimize your crypto portfolio with performance insights, asset allocation analysis, and risk monitoring tools.",
  },
  {
    icon: <InvestmentBankingIcon />,
    
    title: "Market Intelligence",
    desc: "Access curated market research, price trend analysis, and data-driven insights to help you navigate volatile crypto markets.",
  },
  {
    icon: <MarketsIcon />,
       title: "Automated Strategies",
    desc: "Deploy algorithmic trading strategies and automation tools designed to capture opportunities across global crypto markets.",
  },
  {
    icon: <PrivateBankingIcon />,
   title: "Crypto Tax Solutions",
    desc: "Simplify crypto tax reporting with automated transaction tracking, profit-loss summaries, and compliance-ready reports.",
  },
];

const VISIBLE = 4;
const TOTAL = allCards.length;

export default function JPMorganSection() {
  // startIndex = index of the first visible card
  const [startIndex, setStartIndex] = useState(0);
  // activeCard = global index of the highlighted card
  const [activeCard, setActiveCard] = useState(0);

  const handlePrev = () => {
    const newStart = (startIndex - 1 + TOTAL) % TOTAL;
    setStartIndex(newStart);
    setActiveCard(newStart);
  };

  const handleNext = () => {
    const newStart = (startIndex + 1) % TOTAL;
    setStartIndex(newStart);
    // active card becomes first of new window
    setActiveCard(newStart);
  };

  // Build the 4 visible cards (circular)
  const visibleCards = Array.from({ length: VISIBLE }, (_, i) => {
    const globalIdx = (startIndex + i) % TOTAL;
    return { ...allCards[globalIdx], globalIdx };
  });

  return (
    <div className={styles.section}>
      {/* Left image column */}



<div className={styles.imageWrapper}>
  <img
    className={styles.phoneImage}
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQdHHcyseLuMwU1hCmCuMUQl-6xz77qolElQ&s"
    alt="Mobile trading and tax dashboard"
  />
</div>

      {/* Right content */}
      <div className={styles.rightContent}>
        <h2 className={styles.heading}>
          What problem can we{' '}
          <span className={styles.highlight}>
            solve<br />together?
          </span>
        </h2>

        {/* Cards with outer padding so scaled card doesn't clip */}
        <div className={styles.cardsWrapper}>
          <div className={styles.cardsRow}>
            {visibleCards.map(({ icon, title, desc, globalIdx }, i) => (
              <div
                key={i}
                className={`${styles.card} ${globalIdx === activeCard ? styles.cardActive : ''}`}
                onClick={() => setActiveCard(globalIdx)}
              >
                {icon}
                <div className={styles.cardTitle}>{title}</div>
                <div className={styles.cardDesc}>{desc}</div>
                <button className={styles.learnMore}>
                  Learn more <ChevronRight />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dots + Arrow navigation */}
        <div className={styles.dotsRow}>
          <button className={styles.arrowBtn} aria-label="Previous" onClick={handlePrev}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="11,2 5,8 11,14" />
            </svg>
          </button>

          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeCard ? styles.active : ''}`}
              onClick={() => {
                setStartIndex(i);
                setActiveCard(i);
              }}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}

          <button className={styles.arrowBtn} aria-label="Next" onClick={handleNext}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="5,2 11,8 5,14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}