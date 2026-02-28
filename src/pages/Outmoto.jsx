import React, { useState, useEffect, useRef } from "react";
import './Ourmoto.css'
import {useNavigate} from "react-router-dom";
const mottos = [
  {
    id: 1,
    icon: "◈",
    tagline: "PRINCIPLE 01",
    title: "Security Is the Foundation of Wealth",
    body: "From cold-storage crypto vaults to institutional-grade equity execution, every transaction is fortified with layered encryption, compliance monitoring, and real-time risk control. Capital is protected before it is multiplied.",
    accent: "security",
  },
  {
    id: 2,
    icon: "⬡",
    tagline: "PRINCIPLE 02",
    title: "All Markets. One Intelligent Core.",
    body: "Crypto, global equities, structured assets, and alternative investments — unified under a single intelligent system. We eliminate fragmentation so your portfolio moves as one cohesive strategy, not scattered positions.",
    accent: "integration",
  },
  {
    id: 3,
    icon: "◉",
    tagline: "PRINCIPLE 03",
    title: "Advisory Backed by Data, Not Hype",
    body: "Our financial advisory and tax strategies are driven by analytics, regulatory insight, and macro modeling — not speculation. We align every recommendation with long-term wealth architecture, not short-term noise.",
    accent: "advisory",
  },
  {
    id: 4,
    icon: "⬟",
    tagline: "PRINCIPLE 04",
    title: "Global Assets. Local Intelligence.",
    body: "Whether navigating Indian capital gains, U.S. equities, or decentralized protocols, our infrastructure adapts to jurisdictional compliance, taxation, and reporting standards — so growth never clashes with regulation.",
    accent: "compliance",
  },
];



export default function Outmoto() {
  const [visibleCards, setVisibleCards] = useState([]);
  const [heroVisible, setHeroVisible] = useState(false);
  const [ticker, setTicker] = useState(0);

  const cardRefs = useRef([]);
  const heroRef = useRef(null);

  useEffect(() => {
    // HERO OBSERVER
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (heroRef.current) {
      heroObserver.observe(heroRef.current);
    }

    // CARD OBSERVER
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleCards((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.25 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) cardObserver.observe(ref);
    });

    // TICKER ANIMATION
    const interval = setInterval(() => {
      setTicker((prev) => (prev + 1) % 40);
    }, 80);

    return () => {
      heroObserver.disconnect();
      cardObserver.disconnect();
      clearInterval(interval);
    };
  }, []);
  const navigate = useNavigate();  
   const goToContact = () => {
    navigate("/contact");
  };
  return (
    <section className="motto-page">
      {/* Background Elements */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-orb orb-1" aria-hidden="true" />
      <div className="bg-orb orb-2" aria-hidden="true" />

      {/* HERO */}
      <div
        className={`motto-hero ${heroVisible ? "visible" : ""}`}
        ref={heroRef}
      >
        <div className="hero-eyebrow">
          <span className="dot-blink" /> OUR PHILOSOPHY
        </div>

        <h1 className="hero-title">
          <span className="title-line">Finance,</span>
          <span className="title-line accent-text">Reimagined.</span>
        </h1>

        <p className="hero-sub">
          We don't move money. We move possibilities. Every feature, every
          decision, every line of code is written against one measure — does
          this make financial freedom more accessible?
        </p>

        <div className="hero-divider">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className={`tick ${ticker === i ? "active" : ""}`}
            />
          ))}
        </div>
         <button className="contactBtn" onClick={goToContact}>
  Get in touch with us
</button>
      </div>

      {/* MOTTO CARDS */}
      <div className="motto-grid">
        {mottos.map((m, index) => (
          <article
            key={m.id}
            className={`motto-card ${m.accent} ${
              visibleCards.includes(index) ? "visible" : ""
            }`}
            data-index={index}
            ref={(el) => (cardRefs.current[index] = el)}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className="card-icon">{m.icon}</div>
            <div className="card-tag">{m.tagline}</div>
            <h2 className="card-title">{m.title}</h2>
            <p className="card-body">{m.body}</p>
            <div className="card-line" />
          </article>
        ))}
      </div>








      {/* MANIFESTO */}
      <div className="manifesto-strip">
        <p className="manifesto-quote">
          "We believe the most powerful financial tool ever built
          <em> should fit in your pocket</em> — and work for everyone."
        </p>
        <span className="manifesto-sig">— Founders, NovaPay</span>
      </div>










      <div className="who-wrapper">
  <div className="who-container">

    {/* LEFT SIDE */}
    <div className="who-left">
      <h1>Who we are</h1>

      <p className="who-description">
        In a fast-moving and increasingly complex global economy, our success 
        depends on how faithfully we adhere to our core principles: delivering 
        exceptional client service, acting with integrity and responsibility 
        and supporting the growth of our employees.
      </p>

      <div className="who-columns">

        <div className="who-col">
          <h3>Our business</h3>
          <p>
            We are a leading global fintech services firm with advanced
            digital infrastructure and secure financial operations worldwide.
          </p>
          <a href="#">LEARN MORE</a>
        </div>

        <div className="who-col">
          <h3>Global presence</h3>
          <p>
            We serve clients across 60+ markets with a distributed
            technology network and strategic global partnerships.
          </p>
          <a href="#">TAKE A LOOK</a>
        </div>

        <div className="who-col">
          <h3>Our history</h3>
          <p>
            Built on innovation and transparency, we continue to
            redefine digital finance through scalable technology.
          </p>
          <a href="#">EXPLORE HERE</a>
        </div>

      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="who-right">

      <img 
        src="https://images.unsplash.com/photo-1551434678-e076c223a692"
        alt="Fintech professional"
      />

      <div className="impact-card">
        <span className="impact-label">CORPORATE RESPONSIBILITY</span>
        <h2>Our impact</h2>
        <span className="impact-date">November 04, 2024</span>

        <p>
          Powering financial inclusion by breaking barriers and
          enabling economic opportunities across emerging markets.
        </p>

        <a href="#">Read more</a>
      </div>

    </div>

  </div>

</div>
      
     





































<div className="events-wrapper">

  <div className="events-container">

    {/* CARD 1 */}
    <div className="event-card">
      <img 
        src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b"
        alt="Global cities"
      />

      <div className="event-content">
        <h3>Events and Conferences</h3>
        <p>
          Our fintech conferences bring together corporate leaders,
          investors and innovators to explore digital finance trends.
        </p>
        <a href="#">Learn more</a>
      </div>
    </div>

    {/* CARD 2 */}
    <div className="event-card">
      <img 
        src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0"
        alt="Blockchain technology"
      />

      <div className="event-content">
        <span className="event-label">IN-PERSON CONFERENCE</span>
        <h3>Annual Digital Finance Summit</h3>
        <p>
          Highlights from our flagship fintech innovation and
          blockchain leadership conference.
        </p>
        <a href="#">Learn more</a>
      </div>
    </div>

    {/* CARD 3 */}
    <div className="event-card">
      <img 
        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
        alt="Technology systems"
      />

      <div className="event-content">
        <span className="event-label">IN-PERSON CONFERENCE</span>
        <h3>Technology & Financial Infrastructure Forum</h3>
        <p>
          Insights from leaders shaping payment systems,
          AI-driven risk management and global fintech networks.
        </p>
        <a href="#">Learn more</a>
      </div>
    </div>

  </div>

</div>
      





    </section>
  );
}