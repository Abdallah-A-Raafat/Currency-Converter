import "./App.css";
import CurrencyConverter from "./components/CurrencyConverter";
import React from "react";
 
function App() {
  return (
    <div className="app-bg">
      <div className="app-center">
        <header className="app-header">
          <p className="app-eyebrow">Live exchange rates</p>
          <h1 className="app-title">
            Currency <em>Exchange</em>
          </h1>
        </header>
        <CurrencyConverter />
        <footer className="app-footer">
          Made by <a href="https://my-portfolio-black-nu-fqjhf84jfu.vercel.app/" target="_blank" rel="noopener noreferrer"> Abdallah Ahmed </a>
        </footer>
      </div>
    </div>
  );
}
 
export default App;
 