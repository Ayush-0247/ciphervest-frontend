import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const css = `
@import url("https://fonts.googleapis.com/css2?family=Clash+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap");

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

.s1Orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; }
.s1Orb1 { width: 500px; height: 500px; background: rgba(37,99,235,0.07); top: -100px; right: -100px; }
.s1Orb2 { width: 350px; height: 350px; background: rgba(79,70,229,0.05); bottom: 100px; left: -80px; }

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
.tickerOuter { width: 100%; overflow: hidden; position: relative; }
.tickerTrack {
  display: flex;
  width: max-content;
  animation: tickerScroll 30s linear infinite;
  will-change: transform;
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
  white-space: nowrap;
}
.tickerItem .sym { color: var(--muted); font-weight: 400; }
.tickerItem .up  { color: var(--green); }
.tickerItem .dn  { color: var(--red);   }
@keyframes tickerScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.tickerOuter::before,
.tickerOuter::after {
  content: ''; position: absolute; top: 0; bottom: 0; width: 60px; z-index: 2; pointer-events: none;
}
.tickerOuter::before { left: 0;  background: linear-gradient(to right, var(--surface), transparent); }
.tickerOuter::after  { right: 0; background: linear-gradient(to left,  var(--surface), transparent); }

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
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 16px; border-radius: 100px; font-size: 13px; font-weight: 500;
  background: #eff6ff; color: var(--primary); margin-bottom: 26px;
  border: 1px solid rgba(37,99,235,0.12);
}
.badgeDot {
  width: 7px; height: 7px; border-radius: 50%; background: var(--primary);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.7); }
}

.s1Headline {
  font-family: var(--font-display);
  font-size: clamp(44px, 5vw, 64px);
  line-height: 1.1; margin-bottom: 22px;
  opacity: 0; transform: translateY(20px);
  animation: fadeUp 0.7s 0.1s ease forwards;
}
.s1Headline span {
  background: linear-gradient(90deg, var(--primary), var(--primary-light));
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}

.s1Sub {
  color: var(--muted); font-size: 16px; line-height: 1.7;
  max-width: 480px; margin-bottom: 36px;
  opacity: 0; animation: fadeUp 0.7s 0.25s ease forwards;
}

@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

.s1Ctas {
  display: flex; gap: 16px; margin-bottom: 36px;
  opacity: 0; animation: fadeUp 0.7s 0.4s ease forwards;
}
.ctaPrimary {
  padding: 14px 30px; border-radius: 100px; border: none;
  background: var(--primary); color: #fff; font-weight: 600; cursor: pointer;
  font-size: 15px; transition: 0.2s ease;
  box-shadow: 0 8px 24px rgba(37,99,235,0.22);
  display: flex; align-items: center; gap: 8px;
}
.ctaPrimary:hover { background: var(--primary-light); transform: translateY(-1px); box-shadow: 0 12px 28px rgba(37,99,235,0.28); }
.ctaArrow { transition: transform 0.2s; }
.ctaPrimary:hover .ctaArrow { transform: translateX(3px); }
.ctaSecondary {
  padding: 14px 28px; border-radius: 100px; border: 1px solid var(--border);
  background: #fff; color: var(--text); font-weight: 500; font-size: 15px;
  cursor: pointer; transition: 0.2s ease; display: flex; align-items: center; gap: 8px;
}
.ctaSecondary:hover { background: var(--surface2); }

.s1TrustRow {
  display: flex; align-items: center; gap: 16px;
  opacity: 0; animation: fadeUp 0.7s 0.55s ease forwards;
}
.trustAvatars { display: flex; }
.trustAvatar {
  width: 28px; height: 28px; border-radius: 50%; border: 2px solid #fff;
  margin-right: -8px; font-size: 11px; font-weight: 600;
  display: flex; align-items: center; justify-content: center; color: #fff;
}
.ta1 { background: #2563eb; } .ta2 { background: #7c3aed; }
.ta3 { background: #059669; } .ta4 { background: #d97706; }
.trustText { color: var(--muted); font-size: 13px; margin-left: 18px; }
.trustText strong { color: var(--text); }

/* ─── HERO VISUAL ─── */
.s1HeroVisual {
  display: flex; flex-direction: column; gap: 14px;
  opacity: 0; animation: fadeUp 0.7s 0.2s ease forwards;
}

/* ─── PORTFOLIO CARD ─── */
.portfolioCard {
  background: #fff; border: 1px solid var(--border); border-radius: 20px;
  padding: 24px 24px 18px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.06);
  position: relative; overflow: hidden;
}
.portfolioCard::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--primary-light));
  border-radius: 20px 20px 0 0;
}
.pcHeader { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
.pcLabel { font-size: 11px; color: var(--muted); margin-bottom: 3px; text-transform: uppercase; letter-spacing: 0.5px; }
.pcValue { font-family: var(--font-display); font-size: 32px; font-weight: 700; line-height: 1; }
.pcValueSub { font-size: 11px; color: var(--muted); margin-top: 3px; }
.pcBadge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 5px 12px; border-radius: 100px;
  background: #f0fdf4; color: var(--green);
  font-size: 13px; font-weight: 600; border: 1px solid #bbf7d0;
}

.sparkWrap { height: 50px; position: relative; margin-bottom: 14px; }
.sparkWrap svg { width: 100%; height: 100%; }

/* ─── TABS ─── */
.pcTabBar { display: flex; gap: 6px; margin-bottom: 12px; }
.pcTab {
  padding: 5px 14px; border-radius: 100px; border: 1px solid var(--border);
  background: transparent; font-size: 12px; font-weight: 500;
  cursor: pointer; color: var(--muted); transition: 0.2s;
  font-family: var(--font-body);
}
.pcTab:hover { background: var(--surface2); }
.pcTabActive { background: var(--primary) !important; color: #fff !important; border-color: var(--primary) !important; }

/* ─── POSITIONS ─── */
.pcPositions { display: flex; flex-direction: column; gap: 0; }
.pcPos {
  display: grid;
  grid-template-columns: 32px 1fr auto 80px;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid var(--surface2);
}
.pcPos:last-child { border-bottom: none; }

.posIcon {
  width: 32px; height: 32px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; flex-shrink: 0;
}
.posIcon.btc  { background: #fff7ed; color: #ea580c; }
.posIcon.eth  { background: #eff6ff; color: #2563eb; }
.posIcon.sol  { background: #f0f9ff; color: #0284c7; }
.posIcon.nvda { background: #f0fdf4; color: #16a34a; }
.posIcon.aapl { background: #fafafa; color: #1d1d1f; }

.posInfo { display: flex; flex-direction: column; gap: 1px; overflow: hidden; }
.posName { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.posType { font-size: 10px; color: var(--muted); }

.posRight { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
.posPrice { font-size: 13px; font-weight: 600; }
.posChange { font-size: 11px; font-weight: 600; }
.posChange.up { color: var(--green); }
.posChange.dn { color: var(--red); }

.posBarWrap { display: flex; align-items: center; gap: 5px; }
.posBar { flex: 1; height: 4px; background: var(--surface2); border-radius: 2px; overflow: hidden; }
.posBarFill { height: 100%; border-radius: 2px; transition: width 0.6s ease; }
.posBarPct { font-size: 10px; color: var(--muted); width: 26px; text-align: right; flex-shrink: 0; }

/* ─── MINI CARDS ─── */
.miniCards { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.miniCard {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 14px; padding: 16px;
  position: relative; overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
}
.miniCard:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-1px); }
.miniCardGlow::after {
  content: ''; position: absolute; top: -20px; right: -20px;
  width: 60px; height: 60px; border-radius: 50%;
  background: rgba(37,99,235,0.08); pointer-events: none;
}
.miniCardIcon { font-size: 20px; margin-bottom: 8px; }
.miniCardLabel { font-size: 11px; color: var(--muted); margin-bottom: 4px; }
.miniCardValue { font-size: 16px; font-weight: 700; font-family: var(--font-display); }
.miniCardSub { font-size: 11px; color: var(--green); font-weight: 600; margin-top: 2px; }
.miniCardBar { margin-top: 8px; height: 3px; background: var(--surface2); border-radius: 2px; overflow: hidden; }
.miniCardBarFill { height: 100%; border-radius: 2px; background: var(--primary); transition: width 0.8s ease; }

/* ─── STATS BAND ─── */
.s1StatsBand {
  position: relative; z-index: 1;
  width: 100%; max-width: 1200px; margin: auto;
  padding: 40px 20px;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
  background: #ffffff; border-radius: 16px;
  box-shadow: 0 10px 35px rgba(0,0,0,0.08);
}
.statItem { text-align: center; padding: 25px 20px; position: relative; }
.statDivider::before {
  content: ""; position: absolute; left: -10px; top: 20%;
  height: 60%; width: 1px; background: rgba(0,0,0,0.1);
}
.statNum { font-size: 32px; font-weight: 700; color: #0a2540; display: block; }
.statItem p { font-size: 15px; color: #444; margin-top: 6px; }
.statSub { font-size: 13px; color: #1a73e8; margin-top: 6px; }

@media (max-width: 900px) {
  .s1Hero { grid-template-columns: 1fr; text-align: center; padding-top: 40px; }
  .s1Ctas { justify-content: center; flex-wrap: wrap; }
  .s1StatsBand { grid-template-columns: repeat(2, 1fr); }
  .statDivider::before { display: none; }
  .s1TrustRow { justify-content: center; }
  .pcPos { grid-template-columns: 32px 1fr auto; }
  .posBarWrap { display: none; }
}
@media (max-width: 600px) {
  .s1StatsBand { grid-template-columns: 1fr; padding: 30px 18px; }
  .statItem { padding: 20px; border-bottom: 1px solid rgba(0,0,0,0.08); }
  .statItem:last-child { border-bottom: none; }
  .statNum { font-size: 26px; }
}
`;

function SparklinePath({ data, color = "#2563eb" }) {
  const w = 300,
    h = 56;
  const min = Math.min(...data),
    max = Math.max(...data);
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
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SPARK_DATA = [
  82, 78, 85, 80, 88, 92, 87, 95, 91, 97, 94, 100, 98, 105, 110, 108, 115, 112,
  118, 124,
];

function animateValue(setter, end, duration, isDecimal = false) {
  let start = 0;
  const increment = end / (duration / 16);
  const counter = setInterval(() => {
    start += increment;
    if (start >= end) {
      setter(end);
      clearInterval(counter);
    } else setter(isDecimal ? parseFloat(start.toFixed(2)) : Math.floor(start));
  }, 16);
}

const FALLBACK = [
  { sym: "BTC", price: "67,240", chg: "+2.40%", up: true },
  { sym: "ETH", price: "3,512", chg: "+1.80%", up: true },
  { sym: "SOL", price: "142", chg: "-0.95%", up: false },
  { sym: "BNB", price: "580", chg: "+0.62%", up: true },
  { sym: "XRP", price: "0.52", chg: "-1.10%", up: false },
  { sym: "DOGE", price: "0.081", chg: "+3.20%", up: true },
  { sym: "ADA", price: "0.45", chg: "+1.10%", up: true },
  { sym: "TRX", price: "0.11", chg: "-0.40%", up: false },
  { sym: "AVAX", price: "35.20", chg: "+2.10%", up: true },
  { sym: "LINK", price: "14.80", chg: "+0.85%", up: true },
];

function Ticker() {
  const [tickers, setTickers] = useState(FALLBACK);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,ripple,dogecoin,cardano,tron,avalanche-2,chainlink&vs_currencies=usd&include_24hr_change=true",
        );
        const data = await res.json();
        const fmt = (coin) =>
          (data[coin].usd_24h_change > 0 ? "+" : "") +
          data[coin].usd_24h_change.toFixed(2) +
          "%";
        setTickers([
          {
            sym: "BTC",
            price: data.bitcoin.usd.toLocaleString(),
            chg: fmt("bitcoin"),
            up: data.bitcoin.usd_24h_change > 0,
          },
          {
            sym: "ETH",
            price: data.ethereum.usd.toLocaleString(),
            chg: fmt("ethereum"),
            up: data.ethereum.usd_24h_change > 0,
          },
          {
            sym: "SOL",
            price: data.solana.usd.toLocaleString(),
            chg: fmt("solana"),
            up: data.solana.usd_24h_change > 0,
          },
          {
            sym: "BNB",
            price: data.binancecoin.usd.toLocaleString(),
            chg: fmt("binancecoin"),
            up: data.binancecoin.usd_24h_change > 0,
          },
          {
            sym: "XRP",
            price: data.ripple.usd.toLocaleString(),
            chg: fmt("ripple"),
            up: data.ripple.usd_24h_change > 0,
          },
          {
            sym: "DOGE",
            price: data.dogecoin.usd.toLocaleString(),
            chg: fmt("dogecoin"),
            up: data.dogecoin.usd_24h_change > 0,
          },
          {
            sym: "ADA",
            price: data.cardano.usd.toLocaleString(),
            chg: fmt("cardano"),
            up: data.cardano.usd_24h_change > 0,
          },
          {
            sym: "TRX",
            price: data.tron.usd.toLocaleString(),
            chg: fmt("tron"),
            up: data.tron.usd_24h_change > 0,
          },
          {
            sym: "AVAX",
            price: data["avalanche-2"].usd.toLocaleString(),
            chg: fmt("avalanche-2"),
            up: data["avalanche-2"].usd_24h_change > 0,
          },
          {
            sym: "LINK",
            price: data.chainlink.usd.toLocaleString(),
            chg: fmt("chainlink"),
            up: data.chainlink.usd_24h_change > 0,
          },
        ]);
      } catch (err) {
        console.warn("Ticker fetch failed, keeping fallback", err);
      }
    };
    fetchPrices();
    const id = setInterval(fetchPrices, 15000);
    return () => clearInterval(id);
  }, []);

  const doubled = [...tickers, ...tickers];

  return (
    <div className="s1Ticker">
      <div className="tickerOuter">
        <div className="tickerTrack">
          {doubled.map((t, i) => (
            <span key={i} className="tickerItem">
              <span className="sym">{t.sym}</span>
              &nbsp;${t.price}&nbsp;
              <span className={t.up ? "up" : "dn"}>{t.chg}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const positions = [
  {
    sym: "BTC",
    name: "Bitcoin",
    price: "$67,703",
    chg: "2.4%",
    up: true,
    bar: 72,
    cls: "btc",
    type: "crypto",
  },
  {
    sym: "ETH",
    name: "Ethereum",
    price: "$3,512",
    chg: "1.8%",
    up: true,
    bar: 55,
    cls: "eth",
    type: "crypto",
  },
  {
    sym: "SOL",
    name: "Solana",
    price: "$142",
    chg: "0.9%",
    up: false,
    bar: 41,
    cls: "sol",
    type: "crypto",
  },
];

export default function Section1() {
  const [users, setUsers] = useState(0);
  const [assets, setAssets] = useState(0);
  const [uptime, setUptime] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    animateValue(setUsers, 2400000, 2000);
    animateValue(setAssets, 35, 2000);
    animateValue(setUptime, 99.99, 2000, true);
    animateValue(setPortfolioValue, 36582, 1800);
  }, []);

      const navigate = useNavigate();

      const GoTodashboard = () => {
        navigate("/dashboard");
      }
 
    const GoToservices = () => {
      navigate("/ourservices");
    };


  return (
    <>
      <style>{css}</style>
      <section className="s1">
        <div className="s1Orb s1Orb1" />
        <div className="s1Orb s1Orb2" />

        {/* ── Ticker TOP ── */}
        <Ticker />

        <div className="s1Hero">
          {/* ── LEFT COPY ── */}
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
              <button
              onClick={GoTodashboard}
              className="ctaPrimary">
                Market insights <span className="ctaArrow">→</span>
              </button>
              <button onClick={GoToservices} className="ctaSecondary">Services we offer</button>
            </div>
            <div className="s1TrustRow">
              <div className="trustAvatars">
                <div className="trustAvatar ta1">JK</div>
                <div className="trustAvatar ta2">ML</div>
                <div className="trustAvatar ta3">SR</div>
                <div className="trustAvatar ta4">AK</div>
              </div>
              <span className="trustText">
                Trusted by <strong>55</strong> investors in 4+ countries
              </span>
            </div>
          </div>

          {/* ── RIGHT VISUAL ── */}
          <div className="s1HeroVisual">
            {/* Portfolio Card */}
            <div className="portfolioCard">
              <div className="pcHeader">
                <div>
                  <div className="pcLabel">Total Portfolio Value</div>
                  <div className="pcValue">
                    ₹{portfolioValue.toLocaleString()}
                  </div>
                  <div className="pcValueSub">Updated just now</div>
                </div>
                <div className="pcBadge">↑ +12.4%</div>
              </div>

              <div className="sparkWrap">
                <SparklinePath data={SPARK_DATA} />
              </div>

              {/* Filter Tabs */}
              <div className="pcTabBar">
                {["All", "Crypto", "Stocks"].map((tab) => (
                  <button
                    key={tab}
                    className={`pcTab ${activeTab === tab ? "pcTabActive" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Positions List */}
              <div className="pcPositions">
                {positions
                  .filter(
                    (p) =>
                      activeTab === "All" || p.type === activeTab.toLowerCase(),
                  )
                  .map((p) => (
                    <div key={p.sym} className="pcPos">
                      <div className={`posIcon ${p.cls}`}>{p.sym[0]}</div>
                      <div className="posInfo">
                        <span className="posName">{p.name}</span>
                        <span className="posType">{p.sym}</span>
                      </div>
                      <div className="posRight">
                        <span className="posPrice">{p.price}</span>
                        <span className={`posChange ${p.up ? "up" : "dn"}`}>
                          {p.up ? "▲" : "▼"} {p.chg}
                        </span>
                      </div>
                      <div className="posBarWrap">
                        <div className="posBar">
                          <div
                            className="posBarFill"
                            style={{
                              width: `${p.bar}%`,
                              background: p.up ? "var(--green)" : "var(--red)",
                            }}
                          />
                        </div>
                        <span className="posBarPct">{p.bar}%</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* 2×2 Mini Cards */}
            <div className="miniCards">
              <div className="miniCard miniCardGlow">
                <div className="miniCardIcon">🔒</div>
                <div className="miniCardLabel">Insured Assets</div>
                <div className="miniCardValue">$250K</div>
                <div className="miniCardSub">FDIC protected</div>
                <div className="miniCardBar">
                  <div
                    className="miniCardBarFill"
                    style={{ width: "100%", background: "var(--green)" }}
                  />
                </div>
              </div>

              <div className="miniCard miniCardGlow">
                <div className="miniCardIcon">🌍</div>
                <div className="miniCardLabel">Markets Open</div>
                <div className="miniCardValue">14</div>
                <div className="miniCardSub">across 9 regions</div>
                <div className="miniCardBar">
                  <div className="miniCardBarFill" style={{ width: "78%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Band ── */}
        <div className="s1StatsBand">
          {[
            {
              num: `${((users / 100_000)* 2).toFixed(0)}+`,
              label: "Active investors",
              sub: "↑ 23% YoY",
            },
            { num: `${assets}K`, label: "Assets Managed", sub: "↑ 41% YoY" },
            {
              num: `${uptime}%`,
              label: "Platform Uptime",
              sub: "SLA guaranteed",
            },
          ].map((s, i) => (
            <div
              key={i}
              className={i > 0 ? "statItem statDivider" : "statItem"}
            >
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
