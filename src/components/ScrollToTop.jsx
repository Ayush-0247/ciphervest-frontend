import React, { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsFlipped(false); // Reset arrow orientation at top
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    setIsFlipped(true); // Flips arrow downwards

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 9999,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: '#0f172a',
        color: '#ffffff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '22px',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease, background-color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <span
        style={{
          display: 'inline-block',
          transition: 'transform 0.4s ease-in-out',
          transform: isFlipped ? 'rotate(180deg)' : 'rotate(0deg)',
          lineHeight: 1
        }}
      >
        &#8593;
      </span>
    </button>
  );
}