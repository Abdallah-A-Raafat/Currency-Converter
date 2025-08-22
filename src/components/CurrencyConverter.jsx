import React, { useEffect, useState } from "react";

const API_KEY = "9b3fb2b5b01383b7c36b2c5e";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

const defaultFrom = "INR";
const defaultTo = "USD";

function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState(defaultFrom);
  const [toCurrency, setToCurrency] = useState(defaultTo);
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch currency list and initial rate
  useEffect(() => {
    async function fetchCurrencies() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(API_URL + fromCurrency);
        const data = await res.json();
        if (data.result !== "success") throw new Error("API Error");
        setCurrencies(Object.keys(data.conversion_rates));
        setExchangeRate(data.conversion_rates[toCurrency]);
      } catch {
        setError("Failed to fetch currencies.");
      } finally {
        setLoading(false);
      }
    }
    fetchCurrencies();
  }, [fromCurrency, toCurrency]);

  // Handle conversion
  const handleConvert = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL + fromCurrency);
      const data = await res.json();
      if (data.result !== "success") throw new Error("API Error");
      const rate = data.conversion_rates[toCurrency];
      setExchangeRate(rate);
      setResult((parseFloat(amount) * rate).toFixed(3));
    } catch {
      setError("Conversion failed.");
    } finally {
      setLoading(false);
    }
  };

  // Swap currencies
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult("");
  };

  return (
  <div className="w-[500px] h-[600px] flex items-center justify-center mx-auto card-surface rounded-3xl shadow-2xl p-6 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute -top-6 -left-6 w-32 h-32 bg-cyan-400/60 rounded-full mix-blend-screen blur-2xl opacity-70 animate-pulse-glow"></div>
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-violet-400/60 rounded-full mix-blend-screen blur-2xl opacity-70 animate-pulse-glow animation-delay-2000"></div>
      
      <div className="relative z-10 w-full flex flex-col justify-center items-stretch">
        <h1 className="text-3xl font-bold mb-4 text-center tracking-wide bg-gradient-to-r from-cyan-200 to-emerald-200 bg-clip-text text-transparent drop-shadow-lg neon-text">
          💱 CURRENCY CONVERTER
        </h1>
        <form onSubmit={handleConvert} className="relative z-10 w-full">
        {/* Amount row with exact 20px gap */}
        <div className="flex items-center gap-20px mb-8">
          <label className="font-bold text-cyan-100 text-lg whitespace-nowrap">💰 ENTER AMOUNT</label>
          <input
            type="number"
            className="flex-1 p-4 rounded-xl text-slate-900 focus-ring bg-gradient-to-r from-cyan-50 to-emerald-50 placeholder-slate-400 font-semibold text-lg shadow-inner transition-all duration-300 hover:shadow-lg"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
        <div className="flex items-end justify-between mb-8 gap-6">
          <div className="flex-1">
            <label className="block font-bold mb-5 text-cyan-100 text-sm">🌍 FROM</label>
            <div className="flex items-center">
              <select
                className="w-full p-3 rounded-xl text-slate-900 bg-gradient-to-r from-emerald-50 to-cyan-50 focus-ring font-semibold shadow-md transition-all duration-300 hover:shadow-lg"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currencies.map((cur) => (
                  <option key={cur} value={cur}>{cur}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            className="mx-4 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white/30 hover:border-white"
            onClick={handleSwap}
            aria-label="Swap currencies"
          >
            <div className="text-white text-xl font-bold">⇄</div>
          </button>
          <div className="flex-1">
            <label className="block font-bold mb-5 text-cyan-100 text-sm">🎯 TO</label>
            <div className="flex items-center">
              <select
                className="w-full p-3 rounded-xl text-slate-900 bg-gradient-to-r from-cyan-50 to-sky-50 focus-ring font-semibold shadow-md transition-all duration-300 hover:shadow-lg"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {currencies.map((cur) => (
                  <option key={cur} value={cur}>{cur}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="mb-6 p-4 glass rounded-xl border border-white/20">
          {exchangeRate && (
            <div className="text-center">
              <span className="text-cyan-200 font-bold text-lg">📊 Exchange Rate</span>
              <div className="text-white font-bold text-xl mt-1">
                1 {fromCurrency} = {exchangeRate} {toCurrency}
              </div>
            </div>
          )}
        </div>
        {error && (
          <div className="text-red-300 mb-4 p-3 bg-red-500/20 rounded-lg border border-red-400/30 font-semibold">
            ⚠️ {error}
          </div>
        )}
        <button
          type="submit"
          className="w-full btn-primary"
          disabled={loading}
        >
          {loading ? "🔄 Loading..." : "✨ GET EXCHANGE RATE"}
        </button>
      </form>
        {result && (
          <div className="mt-6 text-center p-4 bg-gradient-to-r from-emerald-400/20 to-cyan-500/20 backdrop-blur-sm rounded-xl border border-emerald-300/30">
          <div className="text-emerald-200 text-sm font-semibold mb-1">💰 CONVERTED AMOUNT</div>
          <div className="text-white font-bold text-2xl">
            {amount} {fromCurrency} = {result} {toCurrency}
          </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrencyConverter;
