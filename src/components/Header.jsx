import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <div className={styles.logoIcon}>C</div>
          <span className={styles.logoText}>CIPHERVEST CAPITAL</span>
        </Link>

        {/* Center Pill Navigation */}
        <nav className={`${styles.navPill} ${menuOpen ? styles.navActive : ""}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.activeItem}` : styles.navItem
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.activeItem}` : styles.navItem
            }
            onClick={closeMenu}
          >
            Products
          </NavLink>
          <NavLink
            to="/ourservices"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.activeItem}` : styles.navItem
            }
            onClick={closeMenu}
          >
            Our Services
          </NavLink>
          <NavLink
            to="/outmoto"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.activeItem}` : styles.navItem
            }
            onClick={closeMenu}
          >
            Our Moto
          </NavLink>
          <NavLink
            to="/FAQ"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.activeItem}` : styles.navItem
            }
            onClick={closeMenu}
          >
            FAQ
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.activeItem}` : styles.navItem
            }
            onClick={closeMenu}
          >
            Contact us
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.activeItem}` : styles.navItem
            }
            onClick={closeMenu}
          >
            Markets
          </NavLink>
        </nav>

        {/* Header Right Actions */}
        <div className={styles.headerRight}>
          {/* Hamburger toggle */}
          <button
            type="button"
            className={`${styles.menuToggle} ${menuOpen ? styles.menuOpen : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}