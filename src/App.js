import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const BACKEND_URL = "https://backend-winkly.onrender.com";

export default function App() {
  const localVideoRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [coins, setCoins] = useState(5);
  const [gender, setGender] = useState("any");
  const [country, setCountry] = useState("any");
  const [isVIP, setIsVIP] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    });
  }, []);

  const handleConnect = async () => {
    if (!isVIP && (gender !== "any" || country !== "any")) {
      alert("VIP required to use filters.");
      return;
    }
    if (coins <= 0) {
      alert("Out of coins! Buy more to continue.");
      return;
    }
    const res = await fetch(`${BACKEND_URL}/match`);
    const data = await res.json();
    if (data?.matched) {
      setConnected(true);
      setCoins((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    setConnected(false);
  };

  const handleBuyVIP = () => {
    alert("Stripe checkout coming soon...");
    setIsVIP(true);
  };

  return (
    <div className="app">
      <video ref={localVideoRef} autoPlay muted className="background-video" />

      <div className="glass-ui">
        <h1 className="logo">Winkly 🚀</h1>

        <div className="coin-bar">
          💰 Coins: {coins} {isVIP && <span className="vip">👑 VIP</span>}
        </div>

        <div className="video-frame">
          <video ref={localVideoRef} autoPlay muted className="webcam-preview" />
        </div>

        <div className="filter-bar">
          <select value={gender} onChange={(e) => setGender(e.target.value)} disabled={!isVIP}>
            <option value="any">Any</option>
            <option value="boy">Boy</option>
            <option value="girl">Girl</option>
          </select>
          <select value={country} onChange={(e) => setCountry(e.target.value)} disabled={!isVIP}>
            <option value="any">Any</option>
            <option value="us">🇺🇸 USA</option>
            <option value="in">🇮🇳 India</option>
            <option value="br">🇧🇷 Brazil</option>
          </select>
          {!isVIP && <button className="vip-btn" onClick={handleBuyVIP}>🔓 Unlock Filters</button>}
        </div>

        <div className="btn-group">
          <button onClick={handleConnect}>🔄 Connect</button>
          <button onClick={handleSkip}>⏭️ Skip</button>
        </div>
      </div>
    </div>
  );
}
