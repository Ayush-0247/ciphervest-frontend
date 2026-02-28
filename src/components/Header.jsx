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
          <Link to="/products" onClick={closeMenu}>Product</Link>
          <Link to="/Features" onClick={closeMenu}>Features</Link>
          <Link to="/" onClick={closeMenu}>Partners</Link>
          <Link to="/outmoto" onClick={closeMenu}>Our Moto</Link>
          <Link to="/ourservices" onClick={closeMenu}>Our Services</Link>
          <button className={styles.mobileBtn} onClick={closeMenu}>
            Login
          </button>
        </nav>

        <button className={styles.enterBtn}>Login</button>
      </div>
    </header>
  );
}