import { useEffect, useState,  } from "react";

const css = `
@import url("https://fonts.googleapis.com/css2?family=Clash+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap");

/* ─── TOKENS ─── */
.s1 {
  --bg: #ffffff;
  --surface: #f8fafc;
  --surface2: #f1f5f9;
  --border: #e2e8f0;
  --primary: #2563eb;
  --primary-light: #4f46e5;
  --text: #0f172a;
  --muted: #64748b;
  --green: #16a34a;
  --red: #dc2626;
  --font-display: "Clash Display", sans-serif;
  --font-body: "DM Sans", sans-serif;

  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  overflow-x: hidden;
  position: relative;
}

/* ─── BG ORBS ─── */
.s1Orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}
.s1Orb1 {
  width: 500px; height: 500px;
  background: rgba(37,99,235,0.07);
  top: -100px; right: -100px;
}
.s1Orb2 {
  width: 350px; height: 350px;
  background: rgba(79,70,229,0.05);
  bottom: 100px; left: -80px;
}

/* ─── TICKER ─── */
.s1Ticker {
  position: relative; z-index: 1;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  overflow: hidden;
  height: 40px;
  display: flex;
  align-items: center;
}
.tickerTrack {
  display: flex;
  gap: 0;
  animation: tickerScroll 28s linear infinite;
  white-space: nowrap;
}
.tickerItem {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  padding: 0 28px;
  color: var(--text);
  border-right: 1px solid var(--border);
}
.tickerItem .sym { color: var(--muted); font-weight: 400; }
.tickerItem .up { color: var(--green); }
.tickerItem .dn { color: var(--red); }
@keyframes tickerScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ─── NAV ─── */
.s1Nav {
  position: relative; z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navLogo {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(90deg, var(--primary), var(--primary-light));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.navLinks {
  display: flex;
  gap: 32px;
}
.navLinks a {
  font-size: 14px;
  color: var(--muted);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.navLinks a:hover { color: var(--text); }
.navCta {
  padding: 9px 22px;
  border-radius: 100px;
  border: 1px solid var(--border);
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  color: var(--text);
}
.navCta:hover { background: var(--surface2); }

/* ─── HERO ─── */
.s1Hero {
  position: relative; z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 70px 40px 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 70px;
}

.s1Badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 500;
  background: #eff6ff;
  color: var(--primary);
  margin-bottom: 26px;
  border: 1px solid rgba(37,99,235,0.12);
}
.badgeDot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--primary);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.7); }
}

.s1Headline {
  font-family: var(--font-display);
  font-size: clamp(44px, 5vw, 64px);
  line-height: 1.1;
  margin-bottom: 22px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.7s 0.1s ease forwards;
}
.s1Headline span {
  background: linear-gradient(90deg, var(--primary), var(--primary-light));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.s1Sub {
  color: var(--muted);
  font-size: 16px;
  line-height: 1.7;
  max-width: 480px;
  margin-bottom: 36px;
  opacity: 0;
  animation: fadeUp 0.7s 0.25s ease forwards;
}

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}

/* ── CTAs ── */
.s1Ctas {
  display: flex;
  gap: 16px;
  margin-bottom: 36px;
  opacity: 0;
  animation: fadeUp 0.7s 0.4s ease forwards;
}
.ctaPrimary {
  padding: 14px 30px;
  border-radius: 100px;
  border: none;
  background: var(--primary);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  font-size: 15px;
  transition: 0.2s ease;
  box-shadow: 0 8px 24px rgba(37,99,235,0.22);
  display: flex;
  align-items: center;
  gap: 8px;
}
.ctaPrimary:hover {
  background: var(--primary-light);
  transform: translateY(-1px);
  box-shadow: 0 12px 28px rgba(37,99,235,0.28);
}
.ctaArrow { transition: transform 0.2s; }
.ctaPrimary:hover .ctaArrow { transform: translateX(3px); }

.ctaSecondary {
  padding: 14px 28px;
  border-radius: 100px;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--text);
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}
.ctaSecondary:hover { background: var(--surface2); }

/* ── Trust & Logos ── */
.s1TrustRow {
  display: flex;
  align-items: center;
  gap: 16px;
  opacity: 0;
  animation: fadeUp 0.7s 0.55s ease forwards;
}
.trustAvatars {
  display: flex;
}
.trustAvatar {
  width: 28px; height: 28px;
  border-radius: 50%;
  border: 2px solid #fff;
  margin-right: -8px;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.ta1 { background: #2563eb; }
.ta2 { background: #7c3aed; }
.ta3 { background: #059669; }
.ta4 { background: #d97706; }
.trustText {
  color: var(--muted);
  font-size: 13px;
  margin-left: 18px;
}
.trustText strong { color: var(--text); }

/* ─── CARD AREA ─── */
.s1HeroVisual {
  display: flex;
  flex-direction: column;
  gap: 14px;
  opacity: 0;
  animation: fadeUp 0.7s 0.2s ease forwards;
}

/* Main portfolio card */
.portfolioCard {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 28px 28px 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.06);
  position: relative;
  overflow: hidden;
}
.portfolioCard::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--primary-light));
  border-radius: 20px 20px 0 0;
}
.pcHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
}
.pcLabel { font-size: 12px; color: var(--muted); margin-bottom: 4px; }
.pcValue {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
}
.pcBadge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  border-radius: 100px;
  background: #f0fdf4;
  color: var(--green);
  font-size: 13px;
  font-weight: 600;
  border: 1px solid #bbf7d0;
}

/* Sparkline */
.sparkWrap {
  height: 56px;
  position: relative;
  margin-bottom: 18px;
}
.sparkWrap svg {
  width: 100%;
  height: 100%;
}

/* Mini positions */
.pcPositions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pcPos {
  display: flex;
  align-items: center;
  gap: 10px;
}
.posIcon {
  width: 32px; height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}
.posIcon.btc  { background: #fff7ed; color: #ea580c; }
.posIcon.eth  { background: #eff6ff; color: #2563eb; }
.posIcon.nvda { background: #f0fdf4; color: #16a34a; }
.posName { font-size: 13px; font-weight: 600; flex: 1; }
.posPrice { font-size: 13px; color: var(--muted); margin-right: auto; }
.posChange { font-size: 12px; font-weight: 600; }
.posChange.up { color: var(--green); }
.posChange.dn { color: var(--red); }
.posBar {
  width: 50px; height: 4px;
  background: var(--surface2);
  border-radius: 2px;
  overflow: hidden;
}
.posBarFill { height: 100%; border-radius: 2px; background: var(--primary); }

/* Small cards row */
.miniCards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.miniCard {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 16px;
}
.miniCardIcon { font-size: 20px; margin-bottom: 8px; }
.miniCardLabel { font-size: 11px; color: var(--muted); margin-bottom: 4px; }
.miniCardValue { font-size: 16px; font-weight: 700; font-family: var(--font-display); }
.miniCardSub { font-size: 11px; color: var(--green); font-weight: 600; margin-top: 2px; }

/* ─── STATS BAND ─── */
.s1StatsBand {
  position: relative; z-index: 1;
  padding: 50px 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  background: var(--surface);
  border-top: 1px solid var(--border);
}
.statDivider {
  border-left: 1px solid var(--border);
}
.statItem {
  padding: 0 40px;
  text-align: center;
}
.statItem:first-child { padding-left: 20px; }

.statNum {
  font-family: var(--font-display);
  font-size: 34px;
  margin-bottom: 8px;
  background: linear-gradient(90deg, var(--primary), var(--primary-light));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
}
.statItem p { font-size: 14px; color: var(--muted); }
.statSub { font-size: 11px; color: var(--green); font-weight: 600; margin-top: 4px; }

/* ─── RESPONSIVE ─── */
@media (max-width: 900px) {
  .s1Hero { grid-template-columns: 1fr; text-align: center; padding-top: 40px; }
  .s1Ctas { justify-content: center; flex-wrap: wrap; }
  .s1StatsBand { grid-template-columns: 1fr; }
  .statDivider { border-left: none; border-top: 1px solid var(--border); }
  .s1TrustRow { justify-content: center; }
  .navLinks { display: none; }
}
`;

// Sparkline path generator
function SparklinePath({ data, color = "#2563eb",  }) {
  const w = 300, h = 56;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * (h - 8) - 4;
    return `${x},${y}`;
  });
  const linePath = `M ${pts.join(" L ")}`;
  const areaPath = `${linePath} L ${w},${h} L 0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#sparkGrad)" />
      <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SPARK_DATA = [82, 78, 85, 80, 88, 92, 87, 95, 91, 97, 94, 100, 98, 105, 110, 108, 115, 112, 118, 124];

const TICKERS = [
  { sym: "BTC", price: "67,240", chg: "+2.4%", up: true },
  { sym: "ETH", price: "3,512", chg: "+1.8%", up: true },
  { sym: "NVDA", price: "875.20", chg: "-0.6%", up: false },
  { sym: "AAPL", price: "189.40", chg: "+0.9%", up: true },
  { sym: "SOL", price: "142.80", chg: "+5.2%", up: true },
  { sym: "TSLA", price: "241.30", chg: "-1.1%", up: false },
  { sym: "SPY", price: "524.60", chg: "+0.4%", up: true },
  { sym: "MSFT", price: "415.20", chg: "+0.7%", up: true },
];

function animateValue(setter, end, duration, isDecimal = false) {
  let start = 0;
  const increment = end / (duration / 16);
  const counter = setInterval(() => {
    start += increment;
    if (start >= end) { setter(end); clearInterval(counter); }
    else setter(isDecimal ? parseFloat(start.toFixed(2)) : Math.floor(start));
  }, 16);
}

export default function Section1() {
  const [users, setUsers] = useState(0);
  const [assets, setAssets] = useState(0);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    animateValue(setUsers, 2400000, 2000);
    animateValue(setAssets, 180, 2000);
    animateValue(setUptime, 99.99, 2000, true);
  }, []);

  const doubled = [...TICKERS, ...TICKERS];

  return (
    <>
      <style>{css}</style>
      <section className="s1">
        {/* BG orbs */}
        <div className="s1Orb s1Orb1" />
        <div className="s1Orb s1Orb2" />

        {/* TICKER */}
        <div className="s1Ticker">
          <div className="tickerTrack">
            {doubled.map((t, i) => (
              <span key={i} className="tickerItem">
                <span className="sym">{t.sym}</span>
                ${t.price}
                <span className={t.up ? "up" : "dn"}>{t.chg}</span>
              </span>
            ))}
          </div>
        </div>

        {/* NAV */}
        <nav className="s1Nav">
          <div className="navLogo">Vortex</div>
          <div className="navLinks">
            <a href="#">Markets</a>
            <a href="#">Portfolio</a>
            <a href="#">Crysghstpto</a>
            <a href="#">Learn</a>
          </div>
          <button className="navCta">Sign In</button>
        </nav>

        {/* HERO */}
        <div className="s1Hero">
          <div>
            <div className="s1Badge">
              <span className="badgeDot" />
              Live Global Financial Platform
            </div>

            <h1 className="s1Headline">
              Trade. Invest. <br />
              <span>Build Wealth.</span>
            </h1>

            <p className="s1Sub">
              Crypto, equities, and digital payments — unified in one secure
              ecosystem designed for modern investors worldwide.
            </p>

            <div className="s1Ctas">
              <button className="ctaPrimary">
                Get Started <span className="ctaArrow">→</span>
              </button>
              <button className="ctaSecondary">
                ▶ Watch Demo
              </button>
            </div>

            <div className="s1TrustRow">
              <div className="trustAvatars">
                <div className="trustAvatar ta1">JK</div>
                <div className="trustAvatar ta2">ML</div>
                <div className="trustAvatar ta3">SR</div>
                <div className="trustAvatar ta4">AK</div>
              </div>
              <span className="trustText">
                Trusted by <strong>2.4M+</strong> investors in 140+ countries
              </span>
            </div>
          </div>

          {/* CARDS */}
          <div className="s1HeroVisual">
            <div className="portfolioCard">
              <div className="pcHeader">
                <div>
                  <div className="pcLabel">Total Portfolio Value</div>
                  <div className="pcValue">$124,830</div>
                </div>
                <div className="pcBadge">↑ +12.4%</div>
              </div>

              <div className="sparkWrap">
                <SparklinePath data={SPARK_DATA} />
              </div>

              <div className="pcPositions">
                {[
                  { sym: "BTC", name: "Bitcoin", price: "$67,240", chg: "+2.4%", up: true, bar: 72, cls: "btc" },
                  { sym: "ETH", name: "Ethereum", price: "$3,512", chg: "+1.8%", up: true, bar: 55, cls: "eth" },
                  { sym: "NVDA", name: "Nvidia", price: "$875", chg: "-0.6%", up: false, bar: 38, cls: "nvda" },
                ].map(p => (
                  <div key={p.sym} className="pcPos">
                    <div className={`posIcon ${p.cls}`}>{p.sym.slice(0,1)}</div>
                    <span className="posName">{p.name}</span>
                    <span className="posPrice">{p.price}</span>
                    <span className={`posChange ${p.up ? "up" : "dn"}`}>{p.chg}</span>
                    <div className="posBar">
                      <div className="posBarFill" style={{ width: `${p.bar}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="miniCards">
              <div className="miniCard">
                <div className="miniCardIcon">⚡</div>
                <div className="miniCardLabel">Instant Transfers</div>
                <div className="miniCardValue">0.3s</div>
                <div className="miniCardSub">avg. settlement</div>
              </div>
              <div className="miniCard">
                <div className="miniCardIcon">🔒</div>
                <div className="miniCardLabel">Insured Assets</div>
                <div className="miniCardValue">$250K</div>
                <div className="miniCardSub">FDIC protected</div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS BAND */}
        <div className="s1StatsBand">
          {[
            { num: `${(users / 1_000_000).toFixed(1)}M+`, label: "Active Users", sub: "↑ 23% YoY" },
            { num: `$${assets}B+`, label: "Assets Managed", sub: "↑ 41% YoY" },
            { num: `${uptime}%`, label: "Platform Uptime", sub: "SLA guaranteed" },
          ].map((s, i) => (
            <div key={i} className={i > 0 ? "statItem statDivider" : "statItem"}>
              <span className="statNum">{s.num}</span>
              <p>{s.label}</p>
              <div className="statSub">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}