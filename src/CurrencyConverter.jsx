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
  <div className="w-[500px] h-[500px] flex flex-col justify-center mx-auto bg-purple-900 rounded-2xl shadow-2xl p-8 text-white relative">
      <h1 className="text-3xl font-bold mb-6 text-center tracking-wide border-b-2 pb-2">CURRENCY CONVERTER</h1>
      <form onSubmit={handleConvert}>
        <label className="block font-semibold mb-2 mt-4">ENTER AMOUNT</label>
        <input
          type="number"
          className="w-full p-3 rounded-lg text-purple-900 mb-8 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-yellow-200 placeholder-purple-400"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <div className="flex items-end justify-between mb-6 gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-2">FROM</label>
            <div className="flex items-center">
              <select
                className="p-2 rounded-lg text-purple-900 bg-yellow-200 mr-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
            className="mx-2 bg-yellow-200 text-purple-900 rounded-full p-3 shadow-md hover:bg-yellow-300 transition border-2 border-purple-400 flex items-center justify-center"
            onClick={handleSwap}
            aria-label="Swap currencies"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 3h5v5M8 21H3v-5m13.07-7.07A8.003 8.003 0 013 12m0 0a8.003 8.003 0 0113.07-7.07M21 12a8.003 8.003 0 01-13.07 7.07" />
            </svg>
          </button>
          <div className="flex-1">
            <label className="block font-semibold mb-2">TO</label>
            <div className="flex items-center">
              <select
                className="p-2 rounded-lg text-purple-900 bg-yellow-200 mr-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
        <div className="mb-6 text-lg font-semibold">
          {exchangeRate && (
            <span>1 {fromCurrency} = {exchangeRate} {toCurrency}</span>
          )}
        </div>
        {error && <div className="text-red-400 mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-yellow-200 text-purple-900 font-bold py-3 rounded-lg mt-2 text-lg hover:bg-yellow-300 transition border-2 border-purple-400 shadow-md"
          disabled={loading}
        >
          {loading ? "Loading..." : "GET EXCHANGE RATE"}
        </button>
      </form>
      {result && (
        <div className="mt-8 text-center text-2xl font-bold">
          {amount} {fromCurrency} = {result} {toCurrency}
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
