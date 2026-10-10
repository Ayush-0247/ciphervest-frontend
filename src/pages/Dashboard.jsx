import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
} from "recharts";
import {
  Table,
  LayoutGrid,
  Search,
  Trash2,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  X,
} from "lucide-react";
import styles from "./Dashboard.module.css";

const coinOptions = [
  { id: "bitcoin", symbol: "BTC", pair: "BTCUSDT", name: "Bitcoin", color: "#F7931A" },
  { id: "ethereum", symbol: "ETH", pair: "ETHUSDT", name: "Ethereum", color: "#627EEA" },
  { id: "solana", symbol: "SOL", pair: "SOLUSDT", name: "Solana", color: "#9945FF" },
  { id: "cardano", symbol: "ADA", pair: "ADAUSDT", name: "Cardano", color: "#0033AD" },
  { id: "dogecoin", symbol: "DOGE", pair: "DOGEUSDT", name: "Dogecoin", color: "#C2A633" },
  { id: "litecoin", symbol: "LTC", pair: "LTCUSDT", name: "Litecoin", color: "#0052FE" },
  { id: "ripple", symbol: "XRP", pair: "XRPUSDT", name: "XRP", color: "#23292F" },
  { id: "polkadot", symbol: "DOT", pair: "DOTUSDT", name: "Polkadot", color: "#E6007A" },
  { id: "avalanche", symbol: "AVAX", pair: "AVAXUSDT", name: "Avalanche", color: "#E84142" },
  { id: "chainlink", symbol: "LINK", pair: "LINKUSDT", name: "Chainlink", color: "#2A5ADA" },
  { id: "uniswap", symbol: "UNI", pair: "UNIUSDT", name: "Uniswap", color: "#FF007A" },
  { id: "stellar", symbol: "XLM", pair: "XLMUSDT", name: "Stellar", color: "#14B6EB" },
  { id: "cosmos", symbol: "ATOM", pair: "ATOMUSDT", name: "Cosmos", color: "#2E3148" },
  { id: "near", symbol: "NEAR", pair: "NEARUSDT", name: "NEAR Protocol", color: "#00C08B" },
  { id: "filecoin", symbol: "FIL", pair: "FILUSDT", name: "Filecoin", color: "#0090FF" },
  { id: "aptos", symbol: "APT", pair: "APTUSDT", name: "Aptos", color: "#22D3EE" },
  { id: "vechain", symbol: "VET", pair: "VETUSDT", name: "VeChain", color: "#15BDFF" },
  { id: "algorand", symbol: "ALGO", pair: "ALGOUSDT", name: "Algorand", color: "#000000" },
  { id: "tezos", symbol: "XTZ", pair: "XTZUSDT", name: "Tezos", color: "#2C7DF7" },
  { id: "internet-computer", symbol: "ICP", pair: "ICPUSDT", name: "ICP", color: "#3B00B9" },
];

const MAX_SELECTED = 10;
const BASE = "https://data-api.binance.vision/api/v3";

const fmt = {
  usd: (n) =>
    n == null ? "—" :
      n >= 1000 ? `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}` :
        n >= 1 ? `$${n.toFixed(4)}` :
          `$${n.toFixed(6)}`,
  pct: (n) => n == null ? "—" : `${n >= 0 ? "+" : ""}${parseFloat(n).toFixed(2)}%`,
  time: (ts) => {
    const d = new Date(ts);
    return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  },
};

// ─── Chart Tooltip ─────────────────────────────────────────────────────────────
function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { p, time } = payload[0].payload;
  return (
    <div className={styles.chartTooltip}>
      <div className={styles.tooltipTime}>{time}</div>
      <div className={styles.tooltipPrice}>{fmt.usd(p)}</div>
    </div>
  );
}

// ─── Main Dashboard Component ──────────────────────────────────────────────────
export default function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [prices, setPrices] = useState({});   // { id: { price, change } }
  const [history, setHistory] = useState({});   // { id: [{time, p}] }
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'grid'
  const [searchQuery, setSearchQuery] = useState("");

  const timerRef = useRef(null);
  const lastFetchRef = useRef(0);

  // Fetch 12h klines (30m candles × 24) for one coin from Binance
  const fetchKlines = useCallback(async (coinId) => {
    const coin = coinOptions.find((c) => c.id === coinId);
    if (!coin) return;
    try {
      const res = await fetch(`${BASE}/klines?symbol=${coin.pair}&interval=30m&limit=24`);
      const raw = await res.json();
      if (!Array.isArray(raw)) return;
      const points = raw.map(([openTime, , , , close]) => ({
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
      fetchKlines(id);
      lastFetchRef.current = 0;
      return [...prev, id];
    });
  }, [fetchKlines]);

  const clearAll = () => {
    setCoins([]);
    setPrices({});
    setHistory({});
  };

  const selectPreset = (coinIds) => {
    const valid = coinIds.slice(0, MAX_SELECTED);
    setCoins(valid);
    lastFetchRef.current = 0;
    valid.forEach((id) => fetchKlines(id));
  };

  useEffect(() => {
    fetchPrices();
    clearInterval(timerRef.current);
    timerRef.current = setInterval(fetchPrices, 15_000);
    return () => clearInterval(timerRef.current);
  }, [fetchPrices]);

  // Filtered coins for selector
  const filteredCoins = useMemo(() => {
    if (!searchQuery.trim()) return coinOptions;
    const q = searchQuery.toLowerCase().trim();
    return coinOptions.filter(
      (c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className={styles.page}>
      {/* Background Grid & Ambient Glows (matching FAQ page) */}
      <div className={styles.bgGrid} />
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      <div className={styles.container}>
        {/* Header Bar */}
        <header className={styles.topBar}>
          <div className={styles.titleArea}>
            <div className={styles.badge}>
              <span
                className={`${styles.badgeDot} ${loading ? styles.badgeDotLoading : ""}`}
              />
              {loading ? "Syncing Feed" : "Live Binance L1 Feed"}
            </div>
            <h1 className={styles.title}>
              Markets <span className={styles.titleAccent}>Watchlist</span>
            </h1>
            <p className={styles.subtitle}>
              Streaming spot prices and 12-hour continuous kline trends · 15s refresh interval
            </p>
          </div>

          <div className={styles.controlsArea}>
            {/* View Mode Toggle */}
            <div className={styles.viewToggle} role="group" aria-label="View Mode">
              <button
                type="button"
                className={`${styles.viewBtn} ${viewMode === "table" ? styles.viewBtnActive : ""}`}
                onClick={() => setViewMode("table")}
                title="Table view"
              >
                <Table size={14} />
                <span>Table</span>
              </button>
              <button
                type="button"
                className={`${styles.viewBtn} ${viewMode === "grid" ? styles.viewBtnActive : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid view"
              >
                <LayoutGrid size={14} />
                <span>Grid</span>
              </button>
            </div>

            <span className={styles.counterBadge}>
              {coins.length} / {MAX_SELECTED} Monitored
            </span>
          </div>
        </header>

        {/* Asset Selector */}
        <section className={styles.selectorPanel} aria-label="Asset Selection">
          <div className={styles.selectorTop}>
            <div className={styles.searchBox}>
              <Search className={styles.searchIcon} size={14} />
              <input
                type="text"
                placeholder="Search symbol or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.presetActions}>
              <span className={styles.presetLabel}>Presets:</span>
              <button
                type="button"
                className={styles.presetBtn}
                onClick={() => selectPreset(["bitcoin", "ethereum", "solana"])}
              >
                Top 3 (BTC, ETH, SOL)
              </button>
              <button
                type="button"
                className={styles.presetBtn}
                onClick={() =>
                  selectPreset(["bitcoin", "ethereum", "solana", "ripple", "cardano"])
                }
              >
                Top 5
              </button>
              {coins.length > 0 && (
                <button
                  type="button"
                  className={styles.clearBtn}
                  onClick={clearAll}
                >
                  Clear Watchlist
                </button>
              )}
            </div>
          </div>

          <div className={styles.chipsContainer}>
            {filteredCoins.map((coin) => {
              const selected = coins.includes(coin.id);
              const disabled = !selected && coins.length >= MAX_SELECTED;
              return (
                <div
                  key={coin.id}
                  onClick={() => (!disabled || selected) && toggleCoin(coin.id)}
                  title={disabled && !selected ? `Max ${MAX_SELECTED} selected` : coin.name}
                  className={`${styles.chip} ${selected ? styles.chipActive : ""} ${disabled ? styles.chipDisabled : ""}`}
                >
                  <span
                    className={styles.chipDot}
                    style={{ background: coin.color }}
                  />
                  <span className={styles.chipSymbol}>{coin.symbol}</span>
                  <span className={styles.chipName}>{coin.name}</span>
                  {selected && <span className={styles.chipCheck}>✓</span>}
                </div>
              );
            })}
          </div>
        </section>

        {/* Main Watchlist Presentation */}
        {coins.length === 0 ? (
          <div className={styles.emptyContainer}>
            <h2 className={styles.emptyTitle}>No assets in watchlist</h2>
            <p className={styles.emptyDesc}>
              Select assets above to monitor live market pricing, 24-hour delta, and 12-hour continuous candlestick trends.
            </p>
            <div className={styles.emptyActions}>
              <button
                type="button"
                className={styles.emptyAddBtn}
                onClick={() => selectPreset(["bitcoin", "ethereum", "solana"])}
              >
                Add Benchmark Assets (BTC, ETH, SOL)
              </button>
            </div>
          </div>
        ) : viewMode === "table" ? (
          /* Table View */
          <div className={styles.tableContainer}>
            <table className={styles.marketTable}>
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Pair</th>
                  <th>Last Price</th>
                  <th>24h Change</th>
                  <th>12h Low / High</th>
                  <th>12h Trend (30m)</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {coins.map((id) => {
                  const info = coinOptions.find((c) => c.id === id);
                  if (!info) return null;
                  const data = prices[id];
                  const spark = history[id] ?? [];
                  const isUp = data?.change != null ? parseFloat(data.change) >= 0 : null;
                  const lineColor = isUp === null ? "#94a3b8" : isUp ? "#059669" : "#dc2626";

                  const minPrice = spark.length ? Math.min(...spark.map((d) => d.p)) : null;
                  const maxPrice = spark.length ? Math.max(...spark.map((d) => d.p)) : null;

                  return (
                    <tr key={id}>
                      <td>
                        <div className={styles.tableAssetCell}>
                          <div
                            className={styles.assetAvatar}
                            style={{ background: info.color }}
                          >
                            {info.symbol.slice(0, 3)}
                          </div>
                          <div className={styles.assetMeta}>
                            <span className={styles.assetName}>{info.name}</span>
                            <span className={styles.assetPair}>{info.symbol}</span>
                          </div>
                        </div>
                      </td>

                      <td style={{ color: "#64748b", fontFamily: "monospace", fontSize: "0.8rem" }}>
                        {info.pair}
                      </td>

                      <td className={styles.priceCell}>
                        {fmt.usd(data?.price)}
                      </td>

                      <td>
                        <span
                          className={`${styles.deltaCell} ${isUp ? styles.deltaPositive : isUp === false ? styles.deltaNegative : ""}`}
                        >
                          {isUp ? (
                            <ArrowUpRight size={13} strokeWidth={2.5} />
                          ) : isUp === false ? (
                            <ArrowDownRight size={13} strokeWidth={2.5} />
                          ) : null}
                          {fmt.pct(data?.change)}
                        </span>
                      </td>

                      <td>
                        {minPrice != null && maxPrice != null ? (
                          <div className={styles.rangeCell}>
                            <span>L: {fmt.usd(minPrice)}</span>
                            <span>H: {fmt.usd(maxPrice)}</span>
                          </div>
                        ) : (
                          <span style={{ color: "#94a3b8" }}>—</span>
                        )}
                      </td>

                      <td className={styles.sparkCell}>
                        {spark.length < 2 ? (
                          <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Loading…</span>
                        ) : (
                          <ResponsiveContainer width={130} height={32}>
                            <LineChart data={spark} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                              <YAxis hide domain={["auto", "auto"]} />
                              <XAxis dataKey="time" hide />
                              <Tooltip content={<ChartTooltip />} />
                              <Line
                                type="monotone"
                                dataKey="p"
                                stroke={lineColor}
                                strokeWidth={1.8}
                                dot={false}
                                isAnimationActive={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        )}
                      </td>

                      <td style={{ textAlign: "right" }}>
                        <button
                          type="button"
                          className={styles.rowActionBtn}
                          onClick={() => toggleCoin(id)}
                          title={`Remove ${info.name}`}
                          aria-label={`Remove ${info.name}`}
                        >
                          <X size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Grid View */
          <div className={styles.grid}>
            {coins.map((id) => {
              const info = coinOptions.find((c) => c.id === id);
              if (!info) return null;
              const data = prices[id];
              const spark = history[id] ?? [];
              const isUp = data?.change != null ? parseFloat(data.change) >= 0 : null;
              const lineColor = isUp === null ? "#94a3b8" : isUp ? "#059669" : "#dc2626";

              const minPrice = spark.length ? Math.min(...spark.map((d) => d.p)) : null;
              const maxPrice = spark.length ? Math.max(...spark.map((d) => d.p)) : null;

              return (
                <div key={id} className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.cardAssetInfo}>
                      <div
                        className={styles.assetAvatar}
                        style={{ background: info.color }}
                      >
                        {info.symbol.slice(0, 3)}
                      </div>
                      <div className={styles.assetMeta}>
                        <span className={styles.assetName}>{info.name}</span>
                        <span className={styles.assetPair}>{info.symbol}/USDT</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={styles.rowActionBtn}
                      onClick={() => toggleCoin(id)}
                      title={`Remove ${info.name}`}
                      aria-label={`Remove ${info.name}`}
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div className={styles.cardPriceRow}>
                    <span className={styles.cardPriceText}>{fmt.usd(data?.price)}</span>
                    <span
                      className={`${styles.deltaCell} ${isUp ? styles.deltaPositive : isUp === false ? styles.deltaNegative : ""}`}
                    >
                      {isUp ? (
                        <ArrowUpRight size={13} strokeWidth={2.5} />
                      ) : isUp === false ? (
                        <ArrowDownRight size={13} strokeWidth={2.5} />
                      ) : null}
                      {fmt.pct(data?.change)}
                    </span>
                  </div>

                  {minPrice != null && maxPrice != null && (
                    <div className={styles.cardRangeText}>
                      <span>12h Low: {fmt.usd(minPrice)}</span>
                      <span>12h High: {fmt.usd(maxPrice)}</span>
                    </div>
                  )}

                  <div className={styles.cardChartArea}>
                    {spark.length < 2 ? (
                      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", color: "#94a3b8" }}>
                        Loading trend…
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={64}>
                        <LineChart data={spark} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                          <YAxis hide domain={["auto", "auto"]} />
                          <XAxis dataKey="time" hide />
                          <Tooltip content={<ChartTooltip />} />
                          <Line
                            type="monotone"
                            dataKey="p"
                            stroke={lineColor}
                            strokeWidth={1.8}
                            dot={false}
                            isAnimationActive={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Bar 
        <footer className={styles.footerBar}>
          <div>CipherVest Capital · Institutional Markets Desk</div>
          <div>Data Feed: Binance Vision Public API · All quotes in USD (USDT pair)</div>
        </footer>*/}
      </div>
    </div>
  );
}