import React, { useState, useEffect } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showContent, setShowContent]   = useState(false);
  const [hideEnvelope, setHideEnvelope] = useState(false);

  useEffect(() => {
    // 1. Envelope flies in (CSS handles this automatically via animation)
    // 2. Flap opens at 1.5 s
    const t1 = setTimeout(() => setEnvelopeOpen(true), 1500);
    // 3. Hero content fades in at 3 s
    const t2 = setTimeout(() => setShowContent(true), 2400);
    // 4. Envelope overlay fully gone at 3.5 s (after CSS fade-out completes)
    const t3 = setTimeout(() => setHideEnvelope(true), 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section className={styles.hero}>

      {/* ── ENVELOPE INTRO ── */}
      {!hideEnvelope && (
        <div className={styles.mailScene}>
          <div className={`${styles.envelope} ${envelopeOpen ? styles.open : ""}`}>
            <div className={styles.envelopeBody}>
              <div className={styles.envelopeRight} />
            </div>
            <div className={styles.envelopeFlap} />
          </div>
        </div>
      )}

      {/* ── HERO CONTENT ── */}
      <div className={`${styles.container} ${showContent ? styles.reveal : ""}`}>

        {/* LEFT */}
        <div className={styles.left}>
          <span className={styles.tag}>INSTITUTIONAL CAPITAL</span>

          <h1 className={styles.heading}>
            Engineering <br />
            Institutional Capital
          </h1>

          <h2 className={styles.subHeading}>for the Modern Era</h2>

          <p className={styles.description}>
            CipherVest Capital structures institutional-grade financial
            solutions across digital assets, structured credit, and public
            markets. We bridge traditional finance with blockchain
            infrastructure through disciplined risk management and
            transparent capital deployment.
          </p>

          <div className={styles.buttons}>
            <button className={styles.primaryBtn}>Explore Solutions</button>
            <button className={styles.secondaryBtn}>Investor Documentation</button>
          </div>
        </div>

        {/* RIGHT — floating cards */}
        <div className={`${styles.right} ${styles.floatWrapper}`}>
          <div className={styles.cardTop}>
            <div className={styles.cardChip}>C</div>
            <div className={styles.cardBrand}>VISA</div>
            <div className={styles.cardNumber}>•••• •••• •••• 1001</div>
            <div className={styles.cardFooter}>
              <span>John Doe</span>
              <span>Exp 09/27</span>
            </div>
          </div>

          <div className={styles.cardBottom}>
            <div className={styles.cardHeaderRow}>
              <span style={{ fontSize: 13, color: "#888" }}>John Doe</span>
              <div className={styles.cardChip}>C</div>
            </div>
            <div className={styles.cardNumber}>•••• •••• •••• 8016</div>
            <div className={styles.cardFooter}>
              <span>Exp 09/27</span>
              <span>VISA</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}