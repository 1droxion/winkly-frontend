import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import UpgradePage from "./UpgradePage";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

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
      alert("VIP only! Buy VIP Access to use filters.");
      return;
    }

    if (coins <= 0) {
      alert("You are out of coins. Please buy more to connect.");
      return;
    }

    const res = await fetch("https://backend-winkly.onrender.com/match");
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
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <video ref={localVideoRef} autoPlay muted className="background-video" />

              <div className="glass-ui">
                <h1 className="logo">Winkly 💫</h1>

                <div className="coin-bar">
                  💰 Coins: {coins} {isVIP && <span className="vip">👑 VIP</span>}
                </div>

                <div className="video-frame">
                  <video ref={localVideoRef} autoPlay muted className="webcam-preview" />
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
                  <Link to="/upgrade">
                    <button className="vip-btn">🔓 Unlock VIP Filters ($19.99)</button>
                  </Link>
                )}

                <div className="btn-group">
                  <button onClick={handleConnect}>🔄 Connect</button>
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
            </div>
          }
        />
        <Route path="/upgrade" element={<UpgradePage />} />
      </Routes>
    </Router>
  );
}
