import React, { useEffect, useState, useCallback } from "react";

const API_KEY = "9b3fb2b5b01383b7c36b2c5e";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

const POPULAR = ["USD", "EUR", "GBP", "JPY", "AED", "INR", "CAD", "AUD", "CHF", "CNY", "SGD", "HKD"];

function CurrencyConverter() {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState({});
  const [currentBase, setCurrentBase] = useState("INR");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState("");

  const fetchRates = useCallback(async (base) => {
    const res = await fetch(BASE_URL + base);
    const data = await res.json();
    if (data.result !== "success") throw new Error("API error");
    return data;
  }, []);

  // Initial load
  useEffect(() => {
    async function init() {
      try {
        const data = await fetchRates("INR");
        const allCurrencies = Object.keys(data.conversion_rates).sort();
        setCurrencies(allCurrencies);
        setRates(data.conversion_rates);
        setCurrentBase("INR");
      } catch {
        setError("Failed to load currencies. Check your connection.");
      } finally {
        setInitializing(false);
      }
    }
    init();
  }, [fetchRates]);

  // Refresh rates when fromCurrency changes
  useEffect(() => {
    if (initializing) return;
    if (fromCurrency === currentBase) return;
    async function refresh() {
      try {
        const data = await fetchRates(fromCurrency);
        setRates(data.conversion_rates);
        setCurrentBase(fromCurrency);
        setResult(null);
      } catch {
        setError("Could not fetch rate.");
      }
    }
    refresh();
  }, [fromCurrency]);

  const handleConvert = async () => {
    setError("");
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setLoading(true);
    try {
      let localRates = rates;
      if (fromCurrency !== currentBase) {
        const data = await fetchRates(fromCurrency);
        localRates = data.conversion_rates;
        setRates(localRates);
        setCurrentBase(fromCurrency);
      }
      const rate = localRates[toCurrency];
      setResult({ value: parsed * rate, rate, from: fromCurrency, to: toCurrency, input: parsed });
    } catch {
      setError("Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
    setError("");
  };

  const liveRate = rates[toCurrency];
  const popularCurrencies = currencies.filter((c) => POPULAR.includes(c));
  const otherCurrencies = currencies.filter((c) => !POPULAR.includes(c));

  const formatNumber = (n, decimals = 4) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: decimals }).format(n);

  return (
    <div className="converter-card">
      {/* Amount */}
      <div className="field-group">
        <label className="field-label">Amount</label>
        <input
          className="amount-input"
          type="number"
          value={amount}
          onChange={(e) => { setAmount(e.target.value); setResult(null); }}
          placeholder="1,000"
          min="0"
        />
      </div>

      {/* Currency pair */}
      <div className="pair-row">
        <div className="field-group" style={{ flex: 1 }}>
          <label className="field-label">From</label>
          <select
            className="currency-select"
            value={fromCurrency}
            onChange={(e) => { setFromCurrency(e.target.value); setResult(null); setError(""); }}
            disabled={initializing}
          >
            <optgroup label="— Popular —">
              {popularCurrencies.map((c) => <option key={c} value={c}>{c}</option>)}
            </optgroup>
            <optgroup label="— All Currencies —">
              {otherCurrencies.map((c) => <option key={c} value={c}>{c}</option>)}
            </optgroup>
          </select>
        </div>

        <button className="swap-btn" onClick={handleSwap} aria-label="Swap currencies" title="Swap">
          ⇄
        </button>

        <div className="field-group" style={{ flex: 1 }}>
          <label className="field-label">To</label>
          <select
            className="currency-select"
            value={toCurrency}
            onChange={(e) => { setToCurrency(e.target.value); setResult(null); setError(""); }}
            disabled={initializing}
          >
            <optgroup label="— Popular —">
              {popularCurrencies.map((c) => <option key={c} value={c}>{c}</option>)}
            </optgroup>
            <optgroup label="— All Currencies —">
              {otherCurrencies.map((c) => <option key={c} value={c}>{c}</option>)}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Live rate strip */}
      <div className="rate-strip">
        <span className="rate-strip-label">
          <span className="live-dot" />
          Live rate
        </span>
        <span className="rate-strip-value">
          {initializing
            ? "Loading…"
            : liveRate
            ? `1 ${fromCurrency} = ${liveRate.toFixed(4)} ${toCurrency}`
            : "—"}
        </span>
      </div>

      {/* Error */}
      {error && <div className="error-box">⚠ {error}</div>}

      {/* Convert button */}
      <button
        className="convert-btn"
        onClick={handleConvert}
        disabled={loading || initializing}
      >
        {loading ? "Converting…" : initializing ? "Loading rates…" : "Convert"}
      </button>

      {/* Result */}
      {result && (
        <div className="result-area">
          <div className="result-from">
            {formatNumber(result.input, 0)} {result.from} equals
          </div>
          <div className="result-value">{formatNumber(result.value, 4)}</div>
          <div className="result-currency">{result.to}</div>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;