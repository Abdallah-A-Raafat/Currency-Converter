import './App.css';
import CurrencyConverter from './components/CurrencyConverter';
import React, { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState('dark');
  const isDark = theme === 'dark';

  useEffect(() => {
    // apply theme class to body for full-screen background
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(isDark ? 'theme-dark' : 'theme-light');
    return () => {
      document.body.classList.remove('theme-dark', 'theme-light');
    };
  }, [isDark]);

  return (
    <div className="full-center w-full relative overflow-hidden p-8">
      {/* Theme toggle - fixed top-right of viewport */}
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className={`fixed-top-right w-10 h-10 rounded-full text-lg font-semibold shadow flex items-center justify-center ${isDark ? 'text-white bg-white/10 border border-white/20' : 'text-purple-900 bg-purple-50 border border-purple-200'} hover:opacity-90 transition`}
        aria-label="Toggle theme"
        type="button"
      >
        {isDark ? '☀️' : '🌙'}
      </button>

      {/* Animated background elements (keep subtle in light) */}
      <div className={`absolute top-10 left-10 w-40 h-40 rounded-full filter blur-xl opacity-70 ${isDark ? 'bg-purple-300 mix-blend-multiply animate-pulse-glow' : 'bg-purple-200 mix-blend-multiply'}`}></div>
      <div className={`absolute top-40 right-20 w-32 h-32 rounded-full filter blur-xl opacity-70 ${isDark ? 'bg-yellow-300 mix-blend-multiply animate-pulse-glow animation-delay-2000' : 'bg-yellow-200 mix-blend-multiply'}`}></div>
      <div className={`absolute bottom-20 left-20 w-36 h-36 rounded-full filter blur-xl opacity-70 ${isDark ? 'bg-pink-300 mix-blend-multiply animate-pulse-glow animation-delay-4000' : 'bg-pink-200 mix-blend-multiply'}`}></div>
      <div className={`absolute bottom-10 right-10 w-28 h-28 rounded-full filter blur-xl opacity-70 ${isDark ? 'bg-blue-300 mix-blend-multiply animate-pulse-glow animation-delay-1000' : 'bg-blue-200 mix-blend-multiply'}`}></div>
      
      <div className="flex items-center justify-center w-full">
        <CurrencyConverter />
      </div>
    </div>
  );
}

export default App;