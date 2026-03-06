import { useState, useEffect, useCallback, useRef } from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from "recharts";

const coinOptions = [
  { id: "bitcoin",  name: "Bitcoin",  symbol: "BTC", color: "#F7931A" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", color: "#627EEA" },
  { id: "solana",   name: "Solana",   symbol: "SOL", color: "#9945FF" },
  { id: "cardano",  name: "Cardano",  symbol: "ADA", color: "#0033AD" },
  { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", color: "#C2A633" },
  { id: "litecoin", name: "Litecoin", symbol: "LTC", color: "#BFBBBB" },
  { id: "ripple",   name: "XRP",      symbol: "XRP", color: "#346AA9" },
];

const fmt = {
  usd: (n) =>
    n >= 1
      ? `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
      : `$${n.toFixed(6)}`,
  pct: (n) => `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`,
};

const s = {
  container: {
    background: "#fdf4f4",
    color: "#07090f",
    fontFamily: "'Syne', 'Helvetica Neue', sans-serif",
  },
  inner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "3rem 2.5rem 5rem",
  },
  header: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "1rem",
    paddingBottom: "2rem",
    borderBottom: "2px solid #07090f",
    marginBottom: "2.5rem",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  eyebrow: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.7rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#1a4ef0",
    fontWeight: 500,
  },
  title: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 400,
    color: "#07090f",
    letterSpacing: "-0.02em",
    lineHeight: 1,
  },
  titleAccent: {
    color: "#1a4ef0",
    fontStyle: "italic",
  },
  liveBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.45rem",
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.68rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#4a5068",
    background: "#f5f6fa",
    border: "1px solid #e2e5ef",
    borderRadius: "99px",
    padding: "0.4rem 0.85rem",
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#1a4ef0",
  },
  addBar: {
    display: "flex",
    alignItems: "stretch",
    marginBottom: "2.5rem",
    border: "1.5px solid #07090f",
    borderRadius: 6,
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(7,9,15,.06)",
  },
  select: {
    flex: 1,
    background: "#ffffff",
    border: "none",
    outline: "none",
    padding: "0.85rem 2.5rem 0.85rem 1.1rem",
    fontFamily: "'Syne', sans-serif",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#1c2033",
    cursor: "pointer",
    borderRight: "1.5px solid #07090f",
    appearance: "none",
  },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.85rem 1.75rem",
    background: "#07090f",
    color: "#ffffff",
    fontFamily: "'Syne', sans-serif",
    fontSize: "0.8rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    border: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  btnDisabled: {
    background: "#d4d7e3",
    color: "#8b91a8",
    cursor: "not-allowed",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    padding: "5rem 2rem",
    border: "1.5px dashed #c9cfe0",
    borderRadius: 18,
    background: "#f5f6fa",
  },
  emptyIcon: { fontSize: "2.5rem", opacity: 0.3, lineHeight: 1 },
  emptyTitle: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "1.4rem",
    color: "#1c2033",
  },
  emptySubtitle: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.75rem",
    color: "#8b91a8",
    letterSpacing: "0.06em",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1.25rem",
  },
  card: {
    background: "#ffffff",
    borderRadius: 18,
    boxShadow: "0 0 0 1px #e2e5ef, 0 4px 20px rgba(10,53,184,.07)",
    padding: "1.5rem 1.5rem 1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    position: "relative",
    overflow: "hidden",
    transition: "box-shadow 200ms ease, transform 200ms ease",
    cursor: "default",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  coinInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  coinIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: "#eef2ff",
    border: "1.5px solid #dce5ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.65rem",
    fontWeight: 500,
    color: "#0a35b8",
    letterSpacing: "0.04em",
    flexShrink: 0,
  },
  coinName: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "#07090f",
    letterSpacing: "-0.01em",
  },
  coinPair: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.68rem",
    color: "#8b91a8",
    letterSpacing: "0.06em",
    marginTop: 2,
  },
  removeBtn: {
    width: 28,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    border: "1.5px solid #e2e5ef",
    borderRadius: 6,
    color: "#8b91a8",
    fontSize: "1rem",
    lineHeight: 1,
    cursor: "pointer",
    flexShrink: 0,
  },
  priceRow: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "0.5rem",
  },
  price: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "1.75rem",
    fontWeight: 400,
    color: "#07090f",
    letterSpacing: "-0.02em",
    lineHeight: 1,
  },
  changePositive: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.78rem",
    fontWeight: 500,
    color: "#0a7c52",
    background: "#e8f7f1",
    borderRadius: 6,
    padding: "0.25rem 0.55rem",
    marginTop: "0.45rem",
  },
  changeNegative: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.78rem",
    fontWeight: 500,
    color: "#b81a2d",
    background: "#fce9eb",
    borderRadius: 6,
    padding: "0.25rem 0.55rem",
    marginTop: "0.45rem",
  },
  chart: {
    margin: "0 -0.25rem",
    borderTop: "1px solid #e2e5ef",
    paddingTop: "0.75rem",
  },
  footer: {
    marginTop: "3.5rem",
    paddingTop: "1.5rem",
    borderTop: "1.5px solid #e2e5ef",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    flexWrap: "wrap",
  },
  footerNote: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.68rem",
    color: "#8b91a8",
    letterSpacing: "0.05em",
  },
};

function SparkCard({ coin, data, history, onRemove }) {
  const info = coinOptions.find((c) => c.id === coin);
  const price  = data?.usd;
  const change = data?.usd_24h_change;
  const sparkData = history[coin]?.map((p, i) => ({ t: i, p })) ?? [];
  const isUp = change != null ? change >= 0 : null;

  if (!info) return null;

  return (
    <div style={s.card}>
      <div style={s.cardHeader}>
        <div style={s.coinInfo}>
          <div style={s.coinIcon}>{info.symbol.slice(0, 2)}</div>
          <div>
            <div style={s.coinName}>{info.name}</div>
            <div style={s.coinPair}>{info.symbol}/USD</div>
          </div>
        </div>
        <button style={s.removeBtn} onClick={() => onRemove(coin)}>×</button>
      </div>

      <div style={s.priceRow}>
        <div>
          <div style={s.price}>
            {price != null ? fmt.usd(price) : "—"}
          </div>
          <div style={change != null && change >= 0 ? s.changePositive : s.changeNegative}>
            {change != null ? fmt.pct(change) : "—"}
          </div>
        </div>
      </div>

      <div style={s.chart}>
        <ResponsiveContainer width="100%" height={70}>
          <LineChart data={sparkData}>
            <YAxis hide domain={["auto", "auto"]} />
            <Tooltip
              formatter={(v) => fmt.usd(v)}
              contentStyle={{ background: "#1e2130", border: "none", borderRadius: "6px", fontSize: "0.75rem" }}
            />
            <Line
              type="monotone"
              dataKey="p"
              stroke={isUp === null ? "#64748b" : isUp ? "#00c97a" : "#ff4d6d"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [coins, setCoins]               = useState([]);
  const [prices, setPrices]             = useState({});
  const [history, setHistory]           = useState({});
  const [selectedCoin, setSelectedCoin] = useState("");
  const [loading, setLoading]           = useState(false);

  const timerRef     = useRef(null);
  const lastFetchRef = useRef(0);

  const addCoin = () => {
    if (!selectedCoin) return;
    if (coins.includes(selectedCoin)) return;
    if (coins.length >= 5) return;
    setCoins((prev) => [...prev, selectedCoin]);
    setSelectedCoin("");
    lastFetchRef.current = 0;
  };

  const removeCoin = (coin) => {
    setCoins((prev) => prev.filter((c) => c !== coin));
    setPrices((prev) => { const n = { ...prev }; delete n[coin]; return n; });
    setHistory((prev) => { const n = { ...prev }; delete n[coin]; return n; });
  };

  const fetchPrices = useCallback(async () => {
    const now = Date.now();
    if (now - lastFetchRef.current < 20_000) return;
    lastFetchRef.current = now;
    if (coins.length === 0) return;
    setLoading(true);
    try {
      const ids = coins.join(",");
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );
      const data = await res.json();
      setPrices(data);
      setHistory((prev) => {
        const next = { ...prev };
        for (const coin of coins) {
          const price = data[coin]?.usd;
          if (price != null) {
            const existing = prev[coin] ?? [];
            next[coin] = [...existing, price].slice(-30);
          }
        }
        return next;
      });
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  }, [coins]);

  useEffect(() => {
    fetchPrices();
    clearInterval(timerRef.current);
    timerRef.current = setInterval(fetchPrices, 30_000);
    return () => clearInterval(timerRef.current);
  }, [fetchPrices]);

  const availableCoins = coinOptions.filter((c) => !coins.includes(c.id));

  return (
    <div style={s.container}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet" />

      <div style={s.inner}>
        <header style={s.header}>
          <div style={s.headerLeft}>
            <span style={s.eyebrow}>Live Markets</span>
            <h1 style={s.title}>
              Crypto <span style={s.titleAccent}>Dashboard</span>
            </h1>
          </div>
          <div style={s.liveBadge}>
            <div style={{ ...s.liveDot, animation: loading ? "none" : undefined, opacity: loading ? 0.4 : 1 }} />
            {loading ? "Fetching…" : "Live"}
          </div>
        </header>

        <div style={s.addBar}>
          <select
            style={s.select}
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
          >
            <option value="">Select asset</option>
            {availableCoins.map((coin) => (
              <option key={coin.id} value={coin.id}>{coin.name}</option>
            ))}
          </select>
          <button
            style={{ ...s.btn, ...(!selectedCoin || coins.length >= 5 ? s.btnDisabled : {}) }}
            onClick={addCoin}
            disabled={!selectedCoin || coins.length >= 5}
          >
            + Add
          </button>
        </div>

        {coins.length === 0 ? (
          <div style={s.emptyState}>
            <div style={s.emptyIcon}>₿</div>
            <div style={s.emptyTitle}>No assets tracked</div>
            <div style={s.emptySubtitle}>Select a coin above to get started</div>
          </div>
        ) : (
          <div style={s.grid}>
            {coins.map((coin) => (
              <SparkCard
                key={coin}
                coin={coin}
                data={prices[coin]}
                history={history}
                onRemove={removeCoin}
              />
            ))}
          </div>
        )}

        <footer style={s.footer}>
          <span style={s.footerNote}>Data via CoinGecko · refreshes every 30s · max 5 assets</span>
        </footer>
      </div>
    </div>
  );
}