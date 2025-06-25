import React, { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const localVideoRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [coins, setCoins] = useState(0);
  const [gender, setGender] = useState("any");
  const [country, setCountry] = useState("any");
  const [isVIP, setIsVIP] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    });

    // Check VIP status
    fetch("https://droxion-backend.onrender.com/check-vip")
      .then((res) => res.json())
      .then((data) => {
        if (data.isVIP) {
          setIsVIP(true);
          setTimeout(() => alert("🎉 VIP Unlocked! Filters enabled."), 300);
        }
      });

    // Load coins
    fetch("https://droxion-backend.onrender.com/get-coins")
      .then((res) => res.json())
      .then((data) => {
        if (data.coins !== undefined) setCoins(data.coins);
      });
  }, []);

  const handleConnect = async () => {
    if (!isVIP && (gender !== "any" || country !== "any")) {
      alert("VIP only! Buy VIP Access to use filters.");
      return;
    }

    if (coins <= 0) {
      alert("You are out of coins. Please buy more to connect.");
      return;
    }

    const res = await fetch("https://backend-winkly.onrender.com/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gender, country })
    });

    const data = await res.json();
    if (data?.matched) {
      setConnected(true);
      setCoins((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    setConnected(false);
  };

  return (
    <div className="app">
      <h1 className="logo">Winkly ✯</h1>
      <div className="coin-bar">💰 Coins: {coins} {isVIP && <span className="vip">👑 VIP</span>}</div>

      <div className="video-frame">
        <video ref={localVideoRef} autoPlay muted className="webcam-preview" />
        {!connected && <span>🎥 Your Video Preview</span>}
      </div>

      <div className="filter-bar">
        <select value={gender} onChange={(e) => setGender(e.target.value)} disabled={!isVIP}>
          <option value="any">Any Gender</option>
          <option value="boy">Boy</option>
          <option value="girl">Girl</option>
        </select>

        <select value={country} onChange={(e) => setCountry(e.target.value)} disabled={!isVIP}>
          <option value="any">Any Country</option>
          <option value="us">🇺🇸 USA</option>
          <option value="in">🇮🇳 India</option>
          <option value="br">🇧🇷 Brazil</option>
        </select>
      </div>

      {!isVIP && (
        <a href="https://buy.stripe.com/dRm3cvemh4Rm9DH9po97G06" target="_blank" rel="noopener noreferrer">
          <button className="vip-btn">🔓 Unlock VIP Filters ($19.99)</button>
        </a>
      )}

      <div className="btn-group">
        <button
          onClick={handleConnect}
          disabled={coins <= 0}
        >
          🔄 Connect
        </button>
        <button onClick={handleSkip}>⏭️ Skip</button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3>Buy More Coins 💸</h3>
        <div className="btn-group">
          <a href="https://buy.stripe.com/14AaEX0vr3NidTX0SS97G03" target="_blank" rel="noopener noreferrer">
            <button>5 Coins – $1.99</button>
          </a>
          <a href="https://buy.stripe.com/aFa7sL91X83y17bfNM97G04" target="_blank" rel="noopener noreferrer">
            <button>20 Coins – $5</button>
          </a>
          <a href="https://buy.stripe.com/14AfZh0vrbfK3fj8lk97G05" target="_blank" rel="noopener noreferrer">
            <button>50 Coins – $9.99</button>
          </a>
        </div>
      </div>
    </div>
  );
}
