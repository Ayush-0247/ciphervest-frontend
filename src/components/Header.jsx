import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`${styles.header} ${
        scrolled ? styles.scrolled : ""
      }`}
    >
      <div className={styles.container}>
        
        <div className={styles.logo}>
          <div className={styles.logoIcon}>C</div>
          <span>CIPHERVEST CAPITAL</span>
        </div>

        <div
          className={`${styles.menuToggle} ${
            menuOpen ? styles.active : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav
          className={`${styles.nav} ${
            menuOpen ? styles.navActive : ""
          }`}
        >
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/products" onClick={closeMenu}>Product</Link>
          <Link to="/FAQ" onClick={closeMenu}>FAQ</Link>
          <Link to="/outmoto" onClick={closeMenu}>Our Moto</Link>
          <Link to="/ourservices" onClick={closeMenu}>Our Services</Link>
          

          <Link to="/dashboard" onClick={closeMenu}>Markets</Link>
        </nav>

        
      </div>
    </header>
  );
}