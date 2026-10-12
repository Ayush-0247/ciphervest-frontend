import React, { useState, useEffect } from 'react';

const RING_CIRCUMFERENCE = 2 * Math.PI * 24;

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setIsVisible(window.scrollY > 300);
      setScrollProgress(
        scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0
      );
    };

    window.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);
    updateScrollState();

    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Back to top"
      title="Back to top"
      style={{
        position: 'fixed',
        right: '26px',
        bottom: '26px',
        zIndex: 9999,
        width: '58px',
        height: '58px',
        padding: 0,
        borderRadius: '50%',
        border: '1px solid rgba(125, 211, 252, 0.22)',
        background: isHovered ? '#082f49' : '#0f172a',
        color: '#7dd3fc',
        cursor: 'pointer',
        boxShadow: isHovered
          ? '0 0 0 5px rgba(56, 189, 248, 0.12), 0 8px 22px rgba(2, 6, 23, 0.3)'
          : '0 0 0 1px rgba(255, 255, 255, 0.08), 0 8px 22px rgba(2, 6, 23, 0.28)',
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transform: isHovered ? 'translateY(-3px) scale(1.04)' : 'translateY(0) scale(1)',
        transition: 'opacity 0.25s ease, visibility 0.25s ease, transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <svg
        width="54"
        height="54"
        viewBox="0 0 54 54"
        aria-hidden="true"
        style={{ position: 'absolute', inset: '2px', transform: 'rotate(-90deg)' }}
      >
        <circle cx="27" cy="27" r="24" fill="none" stroke="rgba(148, 163, 184, 0.28)" strokeWidth="2" />
        <circle
          cx="27"
          cy="27"
          r="24"
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE * (1 - scrollProgress)}
          style={{ transition: 'stroke-dashoffset 0.15s linear' }}
        />
      </svg>
      <svg
        width="23"
        height="23"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        style={{ position: 'relative' }}
      >
        <path
          d="M12 19V5M6 11l6-6 6 6"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
