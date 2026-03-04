import React from "react";
import styles from "./SocialGrid.module.css";

export default function SocialGrid() {
  return (
    <section className={styles.section}>

      <div className={styles.header}>
        <p className={styles.tag}>Investor Community</p>
        <h2>Live From The Financial Network</h2>
        <p className={styles.sub}>
          Insights, success stories, and financial discussions flowing from
          our global community of investors and analysts.
        </p>
      </div>

      <div className={styles.stream}>

        <div className={styles.card}>
          <img
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80"
            alt="stock chart"
          />
          <div className={styles.content}>
            <h3>Market Analysis</h3>
            <p>Daily trading insights from professional analysts.</p>
          </div>
        </div>

        <div className={`${styles.card} ${styles.stat}`}>
          <h2>200K+</h2>
          <p>Active Investors</p>
        </div>

        <div className={styles.card}>
          <img
            src="https://images.unsplash.com/photo-1642790551116-18e150f3e3b1?auto=format&fit=crop&w=900&q=80"
            alt="crypto market"
          />
          <div className={styles.content}>
            <h3>Crypto Signals</h3>
            <p>Community driven market intelligence.</p>
          </div>
        </div>

        <div className={`${styles.card} ${styles.quote}`}>
          <p>
            FinPulse advisory helped me optimize tax and rebalance my crypto
            portfolio efficiently.
          </p>
          <span>Verified Client</span>
        </div>

        <div className={styles.card}>
          <img
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80"
            alt="investor"
          />
          <div className={styles.content}>
            <h3>Investor Stories</h3>
            <p>Real experiences from portfolio growth journeys.</p>
          </div>
        </div>

      </div>

    </section>
  );
}