import React, { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [envelopeOpen,  setEnvelopeOpen]  = useState(false);
  const [showContent,   setShowContent]   = useState(false);
  const [fadeOutScene,  setFadeOutScene]  = useState(false);
  const [hideEnvelope,  setHideEnvelope]  = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // 1500ms – flap opens
    const t1 = setTimeout(() => setEnvelopeOpen(true),  1500);
    // 2400ms – hero container fades in so CSS text animations can fire
    const t2 = setTimeout(() => setShowContent(true),   2400);
    // 2800ms – envelope overlay starts fading out
    const t3 = setTimeout(() => setFadeOutScene(true),  2800);
    // 3500ms – remove envelope DOM node entirely
    const t4 = setTimeout(() => setHideEnvelope(true),  3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const goToProduct = () => navigate("/products");
  const goToOurMoto = () => navigate("/outmoto");

  return (
    <section className={styles.hero}>

      {/* ── ENVELOPE INTRO ──────────────────────────────── */}
      {!hideEnvelope && (
        <div className={`${styles.mailScene} ${fadeOutScene ? styles.fadeOut : ""}`}>
          <div className={`${styles.envelope} ${envelopeOpen ? styles.open : ""}`}>
            <div className={styles.envelopeBody}>
              <div className={styles.envelopeRight} />
            </div>
            <div className={styles.envelopeFlap} />
          </div>
        </div>
      )}

      {/* ── HERO CONTENT ────────────────────────────────── */}
      <div className={`${styles.container} ${showContent ? styles.reveal : ""}`}>

        {/* LEFT – text staggered in via CSS (3.1s → 3.9s) */}
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
            <button className={styles.primaryBtn} onClick={goToProduct}>
              Explore Our Services
            </button>
            <button className={styles.secondaryBtn} onClick={goToOurMoto}>
              Know Us
            </button>
          </div>
        </div>

        {/* RIGHT – cards animate purely via CSS keyframes
            Card 1: card1LeftToRight @ 4.1s  — slides from text side (left) → right
            Card 2: card2PopFromCard1 @ 5.4s  — pops out of card 1, settles bottom-left
        */}
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
            <div className={styles.cardChip}>C</div>
            <div className={styles.cardBrand}>VISA</div>
            <div className={styles.cardNumber}>•••• •••• •••• 1001</div>
            <div className={styles.cardFooter}>
              <span>John Doe</span>
              <span>Exp 09/27</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}