import { useEffect, useState } from "react";
import styles from "./Section1.module.css";

export default function Section1() {
  const [users, setUsers] = useState(0);
  const [assets, setAssets] = useState(0);
  const [uptime, setUptime] = useState(0);

  const animateValue = (setter, end, duration, isDecimal = false) => {
    let start = 0;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setter(end);
        clearInterval(counter);
      } else {
        setter(isDecimal ? parseFloat(start.toFixed(2)) : Math.floor(start));
      }
    }, 16);
  };

  useEffect(() => {
    animateValue(setUsers, 2400000, 2000);
    animateValue(setAssets, 180, 2000);
    animateValue(setUptime, 99.99, 2000, true);
  }, []);

  return (
    <section className={styles.s1}>

      {/* HERO */}
      <div className={styles.s1Hero}>

        <div className={styles.s1HeroCopy}>
          <div className={styles.s1Badge}>
            <span className={styles.badgeDot} />
            Live Global Financial Platform
          </div>

          <h1 className={styles.s1Headline}>
            Trade. Invest. <br />
            <span>Build Wealth.</span>
          </h1>

          <p className={styles.s1Sub}>
            Crypto, equities, and digital payments — unified in one secure
            ecosystem designed for modern investors.
          </p>

          <div className={styles.s1Ctas}>
            <button className={styles.ctaPrimary}>Get Started</button>
            <button className={styles.ctaSecondary}>Learn More</button>
          </div>

          <div className={styles.s1Trust}>
            Trusted by investors in 140+ countries
          </div>
        </div>

        {/* Right side card */}
        <div className={styles.s1HeroVisual}>
          <div className={styles.simpleCard}>
            <p className={styles.cardLabel}>Portfolio Value</p>
            <h2>$124,830</h2>
            <span className={styles.positive}>+12.4% this month</span>
          </div>
        </div>

      </div>

      {/* STATS BAND */}
      <div className={styles.s1StatsBand}>
        <div className={styles.statItem}>
          <h3>{(users / 1000000).toFixed(1)}M+</h3>
          <p>Active Users</p>
        </div>

        <div className={styles.statItem}>
          <h3>${assets}B+</h3>
          <p>Assets Managed</p>
        </div>

        <div className={styles.statItem}>
          <h3>{uptime}%</h3>
          <p>Platform Uptime</p>
        </div>
      </div>

    </section>
  );
}