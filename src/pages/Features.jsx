import React from "react";
import styles from "./Features.module.css";

/* ── tiny helpers ── */
const ChevronRight = ({ color = "#2e8b8b", size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
  >
    <polyline points="5,2 11,8 5,14" />
  </svg>
);

const VideoIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="1" y="3" width="10" height="10" rx="1" />
    <polyline points="11,6 15,4 15,12 11,10" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#444"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="16.5" y1="16.5" x2="22" y2="22" />
  </svg>
);

/* ── Data ── */
const industryCards = [
  {
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80",
    title: "Commercial Real Estate",
    desc: "Capitalize on opportunities and prepare for challenges throughout the real estate cycle.",
  },
  {
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80",
    title: "Consumer and Retail",
    desc: "We're here to help you adapt to the rapidly changing environment with end-to-end solutions. Whether you're exploring new commerce models, adapting your physical stores or managing supply chains, J.P. Morgan powers consumer and retail organizations to support strong business models.",
  },
  {
    img: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=700&q=80",
    title: "Diversified Industries",
    desc: "J.P. Morgan delivers world-class financial solutions to clients across industries. From aerospace and defense, industrials to basic materials, transportation to automotive, we can help drive new possibilities for your business.",
  },
  {
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&q=80",
    title: "Energy, Power and Renewables Financial Solutions | J.P. Morgan",
    desc: "J.P. Morgan offers cutting-edge banking and finance solutions to clients in energy investment, utilities, renewable resources, power infrastructure and beyond.",
  },
  {
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&q=80",
    title: "Financial Institutions",
    desc: "Leverage our global expertise in financial services to support your business goals and objectives, including corporate lending, capital raising and risk management.",
  },
  {
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&q=80",
    title: "Financial Sponsors",
    desc: "From M&A advisory and capital market transactions to exits, recapitalization and leveraged buyouts, J.P. Morgan provides tailored banking solutions for sponsors.",
  },
  {
    img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=700&q=80",
    title: "Health Care",
    desc: "Providing specialized banking and financial solutions for health care companies navigating a rapidly evolving landscape.",
  },
  {
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=700&q=80",
    title: "Media, Telecom and Entertainment",
    desc: "J.P. Morgan delivers deep sector expertise and tailored financial solutions for media, telecom and entertainment companies worldwide.",
  },
  {
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&q=80",
    title: "Public Sector",
    desc: "We partner with governments, municipalities, and public institutions to provide comprehensive financial solutions and advisory services.",
  },
];

const clientStories = {
  large: {
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&q=80",
    tag: "BANKING",
    title: "Helping Rhode Put its Best Face Forward",
    date: "Feb 25, 2026",
    desc: "e.l.f. Beauty's acquisition of Rhode, Hailey Bieber's multi-category beauty brand, marks the fastest billion-dollar sale in the industry.",
  },
  mid: {
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=700&q=80",
    tag: "BANKING",
    title: "Fueling the future of reliable energy",
    date: "Feb 17, 2026",
    desc: "J.P. Morgan played a pivotal role in a $5 billion financing package for VoltaGrid, a U.S.-based natural gas energy company.",
  },
  list: [
    {
      time: "3:00",
      category: "REAL ESTATE",
      title: "How tax credit equity helped Dupaco return to its roots",
    },
    {
      time: "0:30",
      category: "BANKING",
      title: "Montara: Innovative therapies for neurological diseases",
    },
    {
      time: "0:30",
      category: "BANKING",
      title: "Midi: Proving women's health is big business",
    },
  ],
};

const insights = {
  left: {
    img: "https://images.unsplash.com/photo-1563770660941-10551b1f78e2?w=700&q=80",
    category: "MARKETS AND ECONOMY",
    title: "AI vs. AI: The arms race for security",
    date: "Feb 27, 2026",
    desc: "As panic around artificial intelligence (AI) fuels exaggerated fears of disruption and sell-offs, cybersecurity and sovereign infrastructure stand to benefit as critical levers of AI adoption.",
  },
  mid: {
    img: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=700&q=80",
    category: "GLOBAL RESEARCH",
    title: "Oil price forecast: A bearish outlook for Brent in 2026",
    date: "Feb 27, 2026",
    desc: "Soft supply-demand fundamentals are putting downward pressure on global oil prices – but geopolitical risks remain a wild card.",
  },
  list: [
    {
      category: "REAL ESTATE",
      title: "What to know about office-to-residential conversion",
    },
    {
      category: "GLOBAL RESEARCH",
      title:
        "How demand for (and supply of) weight loss drugs is playing out in 2026",
    },
    {
      category: "CYBERSECURITY",
      title: "BEC busters: Four callback do's and don'ts",
    },
  ],
};

export default function JPMorganPage() {
  return (
    <div className={styles.page}>
      {/* ── GET IN TOUCH SIDEBAR ── */}
      <div className={styles.getInTouch}>
        <button className={styles.getInTouchBtn}>Get in touch</button>
        <button className={styles.getInTouchArrow}>›</button>
      </div>

      {/* ── HERO BANNER ── */}
      <div className={styles.hero}>
        <img
          className={styles.heroImg}
          src="https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=1400&q=80"
          alt="Industries We Serve"
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>Industries We Serve</h1>
          <p className={styles.heroDesc}>
            Our team of commercial and investment bankers and other specialists
            have deep expertise across a range of industries. We offer solutions
            and services designed to help businesses of all types manage their
            finances and grow.
          </p>
        </div>
      </div>

      {/* ── INDUSTRY CARDS GRID ── */}
      <div className={styles.industrySection}>
        <div className={styles.industryGrid}>
          {industryCards.map((card, i) => (
            <div className={styles.industryCard} key={i}>
              <img
                className={styles.industryCardImg}
                src={card.img}
                alt={card.title}
              />
              <div className={styles.industryCardBody}>
                <div className={styles.industryCardTitle}>{card.title}</div>
                <div className={styles.industryCardDesc}>{card.desc}</div>
                <button className={styles.learnMoreLink}>
                  Learn more <ChevronRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CLIENT STORIES ── */}
      <div className={styles.storiesSection}>
        <h2 className={styles.sectionHeading}>Client stories</h2>
        <button className={styles.seeAllLink}>
          SEE ALL CLIENT STORIES <ChevronRight />
        </button>

        <div className={styles.storiesGrid}>
          {/* Large left card */}
          <div className={styles.storyCardLarge}>
            <img
              className={styles.storyCardLargeImg}
              src={clientStories.large.img}
              alt=""
            />
            <div className={styles.storyCardLargeOverlay}>
              <div className={styles.storyTag}>
                <span className={styles.storyTagDot}>✦</span>
                {clientStories.large.tag}
              </div>
              <div className={styles.storyTitle}>
                {clientStories.large.title}
                <span className={styles.storyTitleChevron}>
                  <ChevronRight color="#fff" size={16} />
                </span>
              </div>
              <div className={styles.storyDate}>{clientStories.large.date}</div>
              <div className={styles.storyDesc}>{clientStories.large.desc}</div>
              <button className={styles.storyReadMore}>Learn more</button>
            </div>
          </div>

          {/* Middle card */}
          <div className={styles.storyCardMid}>
            <img
              className={styles.storyCardMidImg}
              src={clientStories.mid.img}
              alt=""
            />
            <div className={styles.storyCardMidBody}>
              <div className={styles.storyTagLight}>
                {clientStories.mid.tag}
              </div>
              <div className={styles.storyTitleDark}>
                {clientStories.mid.title}
                <span className={styles.storyTitleChevronDark}>
                  <ChevronRight color="#555" size={14} />
                </span>
              </div>
              <div className={styles.storyDateDark}>
                {clientStories.mid.date}
              </div>
              <div className={styles.storyDescDark}>
                {clientStories.mid.desc}
              </div>
              <button className={styles.storyReadMoreDark}>Read more</button>
            </div>
          </div>

          {/* Right list */}
          <div className={styles.storyListPanel}>
            {clientStories.list.map((item, i) => (
              <div className={styles.storyListItem} key={i}>
                <div className={styles.storyListMeta}>
                  <VideoIcon />
                  <span className={styles.storyListMetaSep}>|</span>
                  <span>
                    {item.time} - {item.category}
                  </span>
                </div>
                <div className={styles.storyListTitle}>
                  {item.title}
                  <span className={styles.storyListChevron}>
                    <ChevronRight size={14} />
                  </span>
                </div>
                <button className={styles.storyListWatch}>Watch video</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RELATED INSIGHTS ── */}
      <div className={styles.insightsSection}>
        <h2 className={styles.insightsHeading}>
          Related <span>insights</span>
        </h2>
        <button className={styles.seeAllLink}>
          SEE ALL INSIGHTS <ChevronRight />
        </button>

        <div className={styles.insightsGrid}>
          {/* Left card */}
          <div className={styles.insightCard}>
            <img
              className={styles.insightCardImg}
              src={insights.left.img}
              alt=""
            />
            <div className={styles.insightCategory}>
              {insights.left.category}
            </div>
            <div className={styles.insightTitle}>
              {insights.left.title}
              <span className={styles.insightTitleChevron}>
                <ChevronRight color="#555" size={14} />
              </span>
            </div>
            <div className={styles.insightDate}>{insights.left.date}</div>
            <div className={styles.insightDesc}>{insights.left.desc}</div>
            <button className={styles.insightReadMore}>Read more</button>
          </div>

          {/* Mid card */}
          <div className={styles.insightCard}>
            <img
              className={styles.insightCardImg}
              src={insights.mid.img}
              alt=""
            />
            <div className={styles.insightCategory}>
              {insights.mid.category}
            </div>
            <div className={styles.insightTitle}>
              {insights.mid.title}
              <span className={styles.insightTitleChevron}>
                <ChevronRight color="#555" size={14} />
              </span>
            </div>
            <div className={styles.insightDate}>{insights.mid.date}</div>
            <div className={styles.insightDesc}>{insights.mid.desc}</div>
            <button className={styles.insightReadMore}>Read more</button>
          </div>

          {/* Right list */}
          <div className={styles.insightListPanel}>
            {insights.list.map((item, i) => (
              <div className={styles.insightListItem} key={i}>
                <div className={styles.insightListCategory}>
                  {item.category}
                </div>
                <div className={styles.insightListTitle}>
                  {item.title}
                  <span className={styles.insightListChevron}>
                    <ChevronRight size={14} />
                  </span>
                </div>
                <button className={styles.insightListRead}>Read more</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
