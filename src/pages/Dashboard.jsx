import { useState, useEffect, useCallback, useRef } from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis, XAxis } from "recharts";

const coinOptions = [
  { id: "bitcoin",           symbol: "BTC",  pair: "BTCUSDT",  name: "Bitcoin",       color: "#F7931A" },
  { id: "ethereum",          symbol: "ETH",  pair: "ETHUSDT",  name: "Ethereum",      color: "#627EEA" },
  { id: "solana",            symbol: "SOL",  pair: "SOLUSDT",  name: "Solana",        color: "#9945FF" },
  { id: "cardano",           symbol: "ADA",  pair: "ADAUSDT",  name: "Cardano",       color: "#0033AD" },
  { id: "dogecoin",          symbol: "DOGE", pair: "DOGEUSDT", name: "Dogecoin",      color: "#C2A633" },
  { id: "litecoin",          symbol: "LTC",  pair: "LTCUSDT",  name: "Litecoin",      color: "#A0A0A0" },
  { id: "ripple",            symbol: "XRP",  pair: "XRPUSDT",  name: "XRP",           color: "#346AA9" },
  { id: "polkadot",          symbol: "DOT",  pair: "DOTUSDT",  name: "Polkadot",      color: "#E6007A" },
  { id: "avalanche",         symbol: "AVAX", pair: "AVAXUSDT", name: "Avalanche",     color: "#E84142" },
  { id: "chainlink",         symbol: "LINK", pair: "LINKUSDT", name: "Chainlink",     color: "#2A5ADA" },
  { id: "uniswap",           symbol: "UNI",  pair: "UNIUSDT",  name: "Uniswap",       color: "#FF007A" },
  { id: "stellar",           symbol: "XLM",  pair: "XLMUSDT",  name: "Stellar",       color: "#9B59B6" },
  { id: "cosmos",            symbol: "ATOM", pair: "ATOMUSDT", name: "Cosmos",        color: "#2E3148" },
  { id: "near",              symbol: "NEAR", pair: "NEARUSDT", name: "NEAR Protocol", color: "#00C08B" },
  { id: "filecoin",          symbol: "FIL",  pair: "FILUSDT",  name: "Filecoin",      color: "#0090FF" },
  { id: "aptos",             symbol: "APT",  pair: "APTUSDT",  name: "Aptos",         color: "#00C2FF" },
  { id: "vechain",           symbol: "VET",  pair: "VETUSDT",  name: "VeChain",       color: "#15BDFF" },
  { id: "algorand",          symbol: "ALGO", pair: "ALGOUSDT", name: "Algorand",      color: "#00B4D8" },
  { id: "tezos",             symbol: "XTZ",  pair: "XTZUSDT",  name: "Tezos",         color: "#2C7DF7" },
  { id: "internet-computer", symbol: "ICP",  pair: "ICPUSDT",  name: "ICP",           color: "#3B00B9" },
];

const MAX_SELECTED = 10;
const BASE = "https://data-api.binance.vision/api/v3";

const fmt = {
  usd: (n) =>
    n == null ? "—" :
    n >= 1000  ? `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}` :
    n >= 1     ? `$${n.toFixed(4)}` :
                 `$${n.toFixed(6)}`,
  pct: (n) => n == null ? "—" : `${n >= 0 ? "+" : ""}${parseFloat(n).toFixed(2)}%`,
  time: (ts) => {
    const d = new Date(ts);
    return `${d.getHours().toString().padStart(2,"0")}:${d.getMinutes().toString().padStart(2,"0")}`;
  },
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = {
  // ── SHELL ──────────────────────────────────────────────────────────────────
  container: {
    minHeight: "100dvh",
    background: "rgb(231, 254, 255)",
    color: "#07090f",
    fontFamily: "'Syne', 'Helvetica Neue', sans-serif",
    // safe-area insets for notched phones
    paddingBottom: "env(safe-area-inset-bottom)",
  },

  inner: {
    maxWidth: 1280,
    margin: "0 auto",
    // tight on mobile, generous on desktop
    padding: "clamp(1rem, 4vw, 3rem) clamp(1rem, 4vw, 2.5rem) clamp(2rem, 6vw, 5rem)",
  },

  // ── HEADER ─────────────────────────────────────────────────────────────────
  header: {
    display: "flex",
    alignItems: "center",          // centre-align on mobile (not flex-end)
    justifyContent: "space-between",
    gap: "0.75rem",
    paddingBottom: "clamp(1rem, 3vw, 2rem)",
    borderBottom: "2px solid #07090f",
    marginBottom: "clamp(1rem, 3vw, 2rem)",
    // allow badge to wrap below title on very narrow screens
    flexWrap: "wrap",
  },

  headerLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
    flex: 1,
    minWidth: 0,                   // allow text truncation inside flex child
  },

  eyebrow: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "clamp(0.58rem, 1.8vw, 0.68rem)",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#1a4ef0",
    fontWeight: 500,
  },

  title: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    // tighter floor so it doesn't overflow on 320 px screens
    fontSize: "clamp(1.45rem, 6vw, 2.8rem)",
    fontWeight: 400,
    color: "#07090f",
    letterSpacing: "-0.02em",
    lineHeight: 1,
    whiteSpace: "nowrap",          // keep "Crypto / Dashboard" on one line
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  titleAccent: { color: "#1a4ef0", fontStyle: "italic" },

  liveBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    fontFamily: "'DM Mono', monospace",
    fontSize: "clamp(0.58rem, 1.6vw, 0.66rem)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#4a5068",
    background: "#f5f6fa",
    border: "1px solid #e2e5ef",
    borderRadius: "99px",
    // taller tap target on mobile (min 36 px recommended)
    padding: "0.5rem 0.9rem",
    flexShrink: 0,
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#1a4ef0",
    // pulse animation hook — add keyframe "pulse" in your global CSS
    animation: "pulse 2s ease-in-out infinite",
  },

  // ── COIN PICKER PANEL ──────────────────────────────────────────────────────
  pickerPanel: {
    background: "#f5f6fa",
    border: "1.5px solid #e2e5ef",
    borderRadius: "clamp(10px, 2vw, 14px)",
    // less horizontal padding on mobile so coins don't get squished
    padding: "clamp(0.75rem, 2.5vw, 1.1rem) clamp(0.75rem, 2.5vw, 1.4rem)",
    marginBottom: "clamp(1rem, 3vw, 1.75rem)",
  },

  pickerTitle: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "clamp(0.6rem, 1.8vw, 0.68rem)",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#4a5068",
    marginBottom: "0.75rem",
    fontWeight: 500,
  },

  coinGrid: {
    display: "grid",
    // 2 columns on phones, auto-fill above ~480 px
    gridTemplateColumns: "repeat(auto-fill, minmax(clamp(90px, 22vw, 110px), 1fr))",
    gap: "clamp(0.35rem, 1.2vw, 0.45rem)",
  },

  pickerFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "0.75rem",
    paddingTop: "0.65rem",
    borderTop: "1px solid #e2e5ef",
  },

  pickerCount: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "clamp(0.62rem, 1.8vw, 0.7rem)",
    color: "#8b91a8",
  },

  clearBtn: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "clamp(0.62rem, 1.8vw, 0.7rem)",
    color: "#b81a2d",
    background: "none",
    border: "none",
    cursor: "pointer",
    // bigger tap target
    padding: "0.4rem 0.2rem",
    margin: "-0.4rem -0.2rem",
  },

  // ── EMPTY STATE ────────────────────────────────────────────────────────────
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.65rem",
    // shorter on mobile so it doesn't push everything off screen
    padding: "clamp(2.5rem, 10vw, 5rem) clamp(1rem, 5vw, 2rem)",
    border: "1.5px dashed #c9cfe0",
    borderRadius: "clamp(12px, 3vw, 18px)",
    background: "#f5f6fa",
  },

  emptyIcon: { fontSize: "clamp(1.8rem, 6vw, 2.5rem)", opacity: 0.3, lineHeight: 1 },

  emptyTitle: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
    color: "#1c2033",
    textAlign: "center",
  },

  emptySubtitle: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "clamp(0.65rem, 2vw, 0.75rem)",
    color: "#8b91a8",
    letterSpacing: "0.06em",
    textAlign: "center",
  },

  // ── CARD GRID ──────────────────────────────────────────────────────────────
  grid: {
    display: "grid",
    // 1 col on phone (<480), 2 on tablet, 3+ on desktop
    gridTemplateColumns: "repeat(auto-fill, minmax(clamp(240px, 44vw, 270px), 1fr))",
    gap: "clamp(0.65rem, 2vw, 1.1rem)",
  },

  // ── INDIVIDUAL CARD ────────────────────────────────────────────────────────
  card: {
    background: "#ffffff",
    borderRadius: "clamp(12px, 2.5vw, 16px)",
    boxShadow: "0 0 0 1px #e2e5ef, 0 4px 18px rgba(10,53,184,.06)",
    // a touch more padding on phone so content breathes
    padding: "clamp(0.9rem, 2.5vw, 1.1rem) clamp(0.9rem, 2.5vw, 1.1rem) clamp(0.75rem, 2vw, 0.9rem)",
    display: "flex",
    flexDirection: "column",
    gap: "clamp(0.55rem, 1.5vw, 0.8rem)",
    position: "relative",
    overflow: "hidden",
    // subtle lift on tap — pair with :active CSS pseudo-class
    transition: "transform 0.12s ease, box-shadow 0.12s ease",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  coinInfo: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(0.4rem, 1.5vw, 0.6rem)",
    minWidth: 0,
    flex: 1,
  },

  coinName: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(0.8rem, 2.5vw, 0.86rem)",
    fontWeight: 700,
    color: "#07090f",
    // prevent long names from overflowing
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  coinPair: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "clamp(0.58rem, 1.6vw, 0.62rem)",
    color: "#8b91a8",
    marginTop: 1,
  },

  removeBtn: {
    // minimum 44×44 px visual+touch area recommended by Apple HIG
    width: "clamp(32px, 6vw, 36px)",
    height: "clamp(32px, 6vw, 36px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    border: "1.5px solid #e2e5ef",
    borderRadius: "clamp(5px, 1.5vw, 7px)",
    color: "#8b91a8",
    fontSize: "clamp(0.85rem, 2.5vw, 0.9rem)",
    cursor: "pointer",
    flexShrink: 0,
    // respond to touch
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",
  },

  price: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "clamp(1.3rem, 5vw, 1.55rem)",
    fontWeight: 400,
    color: "#07090f",
    letterSpacing: "-0.02em",
    lineHeight: 1,
  },

  changePositive: {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "'DM Mono', monospace",
    fontSize: "clamp(0.65rem, 2vw, 0.72rem)",
    fontWeight: 500,
    color: "#0a7c52",
    background: "#e8f7f1",
    borderRadius: "clamp(4px, 1vw, 5px)",
    padding: "0.2rem 0.45rem",
    marginTop: "0.3rem",
  },

  changeNegative: {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "'DM Mono', monospace",
    fontSize: "clamp(0.65rem, 2vw, 0.72rem)",
    fontWeight: 500,
    color: "#b81a2d",
    background: "#fce9eb",
    borderRadius: "clamp(4px, 1vw, 5px)",
    padding: "0.2rem 0.45rem",
    marginTop: "0.3rem",
  },

  chartWrap: {
    margin: "0 -0.1rem",
    borderTop: "1px solid #f0f1f5",
    paddingTop: "clamp(0.45rem, 1.5vw, 0.6rem)",
  },

  chartLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "clamp(0.54rem, 1.5vw, 0.58rem)",
    color: "#c9cfe0",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    marginBottom: "0.2rem",
  },

  loadingChart: {
    // shorter on mobile so the card height stays compact
    height: "clamp(52px, 10vw, 72px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#d4d7e3",
    fontFamily: "'DM Mono', monospace",
    fontSize: "clamp(0.6rem, 1.8vw, 0.66rem)",
  },

  // ── FOOTER ─────────────────────────────────────────────────────────────────
  footer: {
    marginTop: "clamp(1.5rem, 4vw, 3rem)",
    paddingTop: "clamp(0.75rem, 2.5vw, 1.25rem)",
    borderTop: "1.5px solid #e2e5ef",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "0.5rem",
  },

  footerNote: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "clamp(0.58rem, 1.6vw, 0.65rem)",
    color: "#8b91a8",
  },
};

// ─── Coin chip ────────────────────────────────────────────────────────────────
function CoinChip({ coin, selected, disabled, onToggle }) {
  return (
    <div
      onClick={() => (!disabled || selected) && onToggle(coin.id)}
      title={disabled && !selected ? `Max ${MAX_SELECTED} selected` : coin.name}
      style={{
        display: "flex", alignItems: "center", gap: "0.4rem",
        padding: "0.4rem 0.6rem", borderRadius: 7, userSelect: "none",
        cursor: disabled && !selected ? "not-allowed" : "pointer",
        border: selected ? `1.5px solid ${coin.color}` : "1.5px solid #e2e5ef",
        background: selected ? `${coin.color}14` : "#ffffff",
        opacity: disabled && !selected ? 0.35 : 1,
        transition: "all 120ms ease",
      }}
    >
      <div style={{ width: 7, height: 7, borderRadius: "50%", background: coin.color, flexShrink: 0 }} />
      <span style={{
        fontFamily: "'Syne', sans-serif", fontSize: "0.74rem", fontWeight: 700,
        color: selected ? coin.color : "#1c2033",
      }}>{coin.symbol}</span>
      {selected && <span style={{ marginLeft: "auto", fontSize: "0.62rem", color: coin.color }}>✓</span>}
    </div>
  );
}

// ─── Chart tooltip ─────────────────────────────────────────────────────────
function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { p, time } = payload[0].payload;
  return (
    <div style={{
      background: "#1e2130", borderRadius: 5, padding: "0.3rem 0.55rem",
      fontSize: "0.68rem", fontFamily: "'DM Mono', monospace", color: "#fff", lineHeight: 1.6,
    }}>
      <div style={{ color: "#8b9dc3" }}>{time}</div>
      <div>{fmt.usd(p)}</div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function SparkCard({ id, data, history, onRemove }) {
  const info = coinOptions.find((c) => c.id === id);
  if (!info) return null;

  const price  = data?.price;
  const change = data?.change;
  const spark  = history[id] ?? [];
  const isUp   = change != null ? parseFloat(change) >= 0 : null;
  const lineColor = isUp === null ? "#94a3b8" : isUp ? "#00c97a" : "#ff4d6d";

  return (
    <div style={s.card}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: lineColor, borderRadius: "16px 16px 0 0" }} />

      <div style={s.cardHeader}>
        <div style={s.coinInfo}>
          <div style={{
            width: 36, height: 36, borderRadius: 9, flexShrink: 0,
            background: `${info.color}18`, border: `1.5px solid ${info.color}45`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'DM Mono', monospace", fontSize: "0.56rem", fontWeight: 600, color: info.color,
          }}>
            {info.symbol.slice(0, 4)}
          </div>
          <div>
            <div style={s.coinName}>{info.name}</div>
            <div style={s.coinPair}>{info.symbol}/USDT</div>
          </div>
        </div>
        <button style={s.removeBtn} onClick={() => onRemove(id)}>×</button>
      </div>

      <div>
        <div style={s.price}>{fmt.usd(price)}</div>
        <div style={isUp ? s.changePositive : s.changeNegative}>
          {isUp ? "▲ " : "▼ "}{fmt.pct(change)}
        </div>
      </div>

      <div style={s.chartWrap}>
        <div style={s.chartLabel}>Last 12 hours · Binance</div>
        {spark.length < 2
          ? <div style={s.loadingChart}>Loading chart…</div>
          : (
            <ResponsiveContainer width="100%" height={72}>
              <LineChart data={spark} margin={{ top: 3, right: 3, left: 3, bottom: 0 }}>
                <YAxis hide domain={["auto", "auto"]} />
                <XAxis dataKey="time" hide />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="p" stroke={lineColor} strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          )
        }
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [coins, setCoins]     = useState([]);
  const [prices, setPrices]   = useState({});   // { id: { price, change } }
  const [history, setHistory] = useState({});   // { id: [{time, p}] }
  const [loading, setLoading] = useState(false);

  const timerRef     = useRef(null);
  const lastFetchRef = useRef(0);

  // Fetch 12h klines (30m candles × 24) for one coin from Binance
  const fetchKlines = useCallback(async (coinId) => {
    const coin = coinOptions.find((c) => c.id === coinId);
    if (!coin) return;
    try {
      const res = await fetch(`${BASE}/klines?symbol=${coin.pair}&interval=30m&limit=24`);
      const raw = await res.json();
      if (!Array.isArray(raw)) return;
      // Binance kline: [openTime, open, high, low, close, volume, closeTime, ...]
      const points = raw.map(([openTime,,,, close]) => ({
        time: fmt.time(openTime),
        p: parseFloat(close),
      }));
      setHistory((prev) => ({ ...prev, [coinId]: points }));
    } catch (err) {
      console.error("Klines error:", coinId, err);
    }
  }, []);

  // Fetch live prices for all selected coins in ONE request
  const fetchPrices = useCallback(async () => {
    const now = Date.now();
    if (now - lastFetchRef.current < 15_000) return;
    lastFetchRef.current = now;
    if (coins.length === 0) return;
    setLoading(true);
    try {
      // Batch 24hr ticker — pass multiple symbols as JSON array
      const pairs = coins.map((id) => coinOptions.find((c) => c.id === id)?.pair).filter(Boolean);
      const symbolsParam = encodeURIComponent(JSON.stringify(pairs));
      const res = await fetch(`${BASE}/ticker/24hr?symbols=${symbolsParam}`);
      const data = await res.json();
      if (!Array.isArray(data)) return;

      const next = {};
      for (const t of data) {
        const coin = coinOptions.find((c) => c.pair === t.symbol);
        if (coin) next[coin.id] = { price: parseFloat(t.lastPrice), change: t.priceChangePercent };
      }
      setPrices(next);
    } catch (err) {
      console.error("Price fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [coins]);

  const toggleCoin = useCallback((id) => {
    setCoins((prev) => {
      if (prev.includes(id)) {
        setPrices((p) => { const n = { ...p }; delete n[id]; return n; });
        setHistory((h) => { const n = { ...h }; delete n[id]; return n; });
        return prev.filter((c) => c !== id);
      }
      if (prev.length >= MAX_SELECTED) return prev;
      fetchKlines(id);         // load 12h chart immediately
      lastFetchRef.current = 0; // force price refresh
      return [...prev, id];
    });
  }, [fetchKlines]);

  const clearAll = () => { setCoins([]); setPrices({}); setHistory({}); };

  useEffect(() => {
    fetchPrices();
    clearInterval(timerRef.current);
    timerRef.current = setInterval(fetchPrices, 15_000); // refresh every 15s (Binance is fast)
    return () => clearInterval(timerRef.current);
  }, [fetchPrices]);

  return (
    <div style={s.container}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet" />

      <div style={s.inner}>
        {/* Header */}
        <header style={s.header}>
          <div style={s.headerLeft}>
            <span style={s.eyebrow}>Binance · No Key · 12h Chart</span>
            <h1 style={s.title}>Crypto <span style={s.titleAccent}>Dashboard</span></h1>
          </div>
          <div style={s.liveBadge}>
            <div style={{ ...s.liveDot, opacity: loading ? 0.25 : 1 }} />
            {loading ? "Fetching…" : "Live · 15s"}
          </div>
        </header>

        {/* Coin Picker */}
        <div style={s.pickerPanel}>
          <div style={s.pickerTitle}>Select up to {MAX_SELECTED} coins — click to toggle</div>
          <div style={s.coinGrid}>
            {coinOptions.map((coin) => (
              <CoinChip
                key={coin.id}
                coin={coin}
                selected={coins.includes(coin.id)}
                disabled={!coins.includes(coin.id) && coins.length >= MAX_SELECTED}
                onToggle={toggleCoin}
              />
            ))}
          </div>
          <div style={s.pickerFooter}>
            <span style={s.pickerCount}>
              {coins.length} / {MAX_SELECTED} selected{coins.length === MAX_SELECTED ? " · limit reached" : ""}
            </span>
            {coins.length > 0 && <button style={s.clearBtn} onClick={clearAll}>✕ Clear all</button>}
          </div>
        </div>

        {/* Cards */}
        {coins.length === 0 ? (
          <div style={s.emptyState}>
            <div style={s.emptyIcon}>₿</div>
            <div style={s.emptyTitle}>No assets selected</div>
            <div style={s.emptySubtitle}>Click any coin above to start tracking</div>
          </div>
        ) : (
          <div style={s.grid}>
            {coins.map((id) => (
              <SparkCard key={id} id={id} data={prices[id]} history={history} onRemove={toggleCoin} />
            ))}
          </div>
        )}

        <footer style={s.footer}>
          <span style={s.footerNote}>
            Powered by Binance public API 
          </span>
        </footer>
      </div>
    </div>
  );
}