import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./Dashboard.module.css";
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

function SparkCard({ coin, data, history, onRemove }) {
  const info = coinOptions.find((c) => c.id === coin);

  const price  = data?.usd;
  const change = data?.usd_24h_change;

  const sparkData = history[coin]?.map((p, i) => ({ t: i, p })) ?? [];

 
  const isUp = change != null ? change >= 0 : true;


  if (!info) return null;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.coinInfo}>
          <div className={styles.coinIcon}>{info.symbol.slice(0, 2)}</div>

          <div>
            <div className={styles.coinName}>{info.name}</div>
            <div className={styles.coinPair}>{info.symbol}/USD</div>
          </div>
        </div>

        <button className={styles.removeBtn} onClick={() => onRemove(coin)}>
          ×
        </button>
      </div>

      <div className={styles.priceRow}>
        <div>
          {/* FIX 4: was `price ? ...` — falsy for price=0; use `price != null` */}
          <div className={styles.price}>
            {price != null ? fmt.usd(price) : "—"}
          </div>

          {/* FIX 4: same issue for change */}
          <div className={change != null ? styles.changePositive : styles.changeNegative}>
            {change != null ? fmt.pct(change) : "—"}
          </div>
        </div>
      </div>

      <div className={styles.chart}>
  <ResponsiveContainer width="100%" height={70}>
          <LineChart data={sparkData}>
            <YAxis hide />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="p"
              stroke={isUp ? "#00c97a" : "#ff4d6d"}
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

  const timerRef = useRef(null);

  const addCoin = () => {
    if (!selectedCoin) return;
    if (coins.includes(selectedCoin)) return;
    if (coins.length >= 5) return;
    setCoins((prev) => [...prev, selectedCoin]);
    setSelectedCoin("");
  };

  
  const removeCoin = (coin) => {
    setCoins((prev) => prev.filter((c) => c !== coin));
    setPrices((prev) => { const n = { ...prev }; delete n[coin]; return n; });
    setHistory((prev) => { const n = { ...prev }; delete n[coin]; return n; });
  };


  const fetchPrices = useCallback(async () => {
    if (coins.length === 0) return;
    setLoading(true);
    try {
      const ids = coins.join(",");
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );
   
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPrices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [coins]);

  useEffect(() => {
    fetchPrices();
    clearInterval(timerRef.current);
    timerRef.current = setInterval(fetchPrices, 30000);
    return () => clearInterval(timerRef.current);
  }, [fetchPrices]);

  const availableCoins = coinOptions.filter((c) => !coins.includes(c.id));

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>
        Crypto Dashboard{loading && <span className={styles.loadingDot}> ●</span>}
      </h1>

<div className={styles.addBar}>
  <select
    value={selectedCoin}
    onChange={(e) => setSelectedCoin(e.target.value)}
  >
    <option value="">Select asset</option>

    {availableCoins.map((coin) => (
      <option key={coin.id} value={coin.id}>
        {coin.name}
      </option>
    ))}
  </select>

  <button
    className={styles.btn}
    onClick={addCoin}
    disabled={!selectedCoin || coins.length >= 5}
  >
    Add
  </button>
</div>

      <div className={styles.grid}>
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
    </div>
  );
}