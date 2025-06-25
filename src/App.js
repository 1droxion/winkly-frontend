import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Login from "./Login";
import Profile from "./Profile";
import axios from "axios";

export default function App() {
  const localVideoRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState(null);
  const [gender, setGender] = useState("Any Gender");
  const [country, setCountry] = useState("Any Country");
  const [view, setView] = useState("app"); // 'login' | 'profile' | 'app'

  useEffect(() => {
    const saved = localStorage.getItem("winkly_user");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
    }

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    });
  }, []);

  const handleConnect = async () => {
    if (!user) {
      alert("Please login first.");
      return;
    }

    if (!user.vip && (gender !== "Any Gender" || country !== "Any Country")) {
      alert("VIP only! Buy VIP Access to use filters.");
      return;
    }

    if (user.coins <= 0) {
      alert("You are out of coins. Please buy more.");
      return;
    }

    const res = await fetch("https://backend-winkly.onrender.com/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gender, country }),
    });

    const data = await res.json();
    if (data?.matched) {
      setConnected(true);
      const updated = { ...user, coins: user.coins - 1 };
      setUser(updated);
      localStorage.setItem("winkly_user", JSON.stringify(updated));
    }
  };

  const handleSkip = () => {
    setConnected(false);
  };

  if (!user) return <Login onLogin={(u) => { setUser(u); setView("app"); }} />;
  if (view === "profile") return <Profile user={user} onLogout={() => { setUser(null); localStorage.removeItem("winkly_user"); }} />;

  return (
    <div className="app">
      <h1 className="logo">Winkly ✯</h1>
      <div className="coin-bar">
        💰 Coins: {user.coins}
        {user.vip && <span className="vip">👑 VIP</span>}
        <button onClick={() => setView("profile")} style={{ marginLeft: "auto", background: "none", color: "#fff", border: "none", cursor: "pointer" }}>
          ⚙️ Profile
        </button>
      </div>

      <div className="video-frame">
        <video ref={localVideoRef} autoPlay muted className="webcam-preview" />
        {!connected && <span>🎥 Your Video Preview</span>}
      </div>

      <div className="filter-bar">
        <div className="custom-dropdown">
          <button className="dropdown-btn">{gender}</button>
          <div className="dropdown-list">
            <div onClick={() => setGender("Any Gender")}>Any Gender</div>
            <div onClick={() => setGender("Boy")}>Boy</div>
            <div onClick={() => setGender("Girl")}>Girl</div>
          </div>
        </div>
        <div className="custom-dropdown">
          <button className="dropdown-btn">{country}</button>
          <div className="dropdown-list">
            <div onClick={() => setCountry("Any Country")}>Any Country</div>
            <div onClick={() => setCountry("🇺🇸 USA")}>🇺🇸 USA</div>
            <div onClick={() => setCountry("🇮🇳 India")}>🇮🇳 India</div>
            <div onClick={() => setCountry("🇧🇷 Brazil")}>🇧🇷 Brazil</div>
            <div onClick={() => setCountry("🇷🇺 Russia")}>🇷🇺 Russia</div>
            <div onClick={() => setCountry("🇲🇽 Mexico")}>🇲🇽 Mexico</div>
          </div>
        </div>
      </div>

      {!user.vip && (
        <a href="https://buy.stripe.com/dRm3cvemh4Rm9DH9po97G06" target="_blank" rel="noopener noreferrer">
          <button className="vip-btn">🔓 Unlock VIP Filters ($19.99)</button>
        </a>
      )}

      <div className="btn-group">
        <button onClick={handleConnect} disabled={!user || user.coins <= 0}>🔄 Connect</button>
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
