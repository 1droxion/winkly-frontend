import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FaHome, FaGem, FaUserTie, FaChartBar } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import "./App.css";

import Discover from "./Discover";
import Profile from "./Profile";
import Admin from "./Admin";
import UpgradePage from "./UpgradePage";

const Home = () => <h2>🏠 Welcome to Winkly</h2>;

function App() {
  const navigate = useNavigate();
  const [cameraAllowed, setCameraAllowed] = useState(null);
  const [coins, setCoins] = useState(1);
  const [gender, setGender] = useState("any");
  const [country, setCountry] = useState("any");

  // 🧠 Simulated user (replace with real user from backend later)
  const user = {
    email: "user@example.com",
    vip: false, // ✅ Set true for testing VIP
    is_girl: false,
    coins,
    gifts_received: 20
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => setCameraAllowed(true))
      .catch(() => setCameraAllowed(false));
  }, []);

  const handleConnect = () => {
    if (!user.vip && coins <= 0) {
      alert("❌ You need more coins to connect. Please upgrade to VIP.");
      return;
    }

    if (!user.vip) {
      setCoins((prev) => prev - 1);
    }

    // Replace this with your real WebRTC iframe or match room
    window.open("https://winkly-call.vercel.app/room", "_blank");
  };

  const handleSkip = () => {
    alert("⏭️ Searching for next user (real or bot)...");
    // TODO: Inject bot if no real match (from backend)
  };

  return (
    <div className="winkly">
      <div className="topbar">
        <button onClick={() => navigate("/")} title="Home"><FaHome /></button>
        <button onClick={() => navigate("/discover")} title="Discover"><GiPartyPopper /></button>
        <button onClick={() => navigate("/plans")} title="Plans"><FaGem /></button>
        <button onClick={() => navigate("/profile")} title="Profile"><FaUserTie /></button>
        <button onClick={() => navigate("/admin")} title="Admin"><FaChartBar /></button>
      </div>

      <h1>Winkly ★</h1>
      <p>💰 Coins: {coins} {user.vip && " (VIP 👑 Unlimited)"}</p>

      <div className="video-box">
        {cameraAllowed === false ? (
          <p className="error">🚫 Camera access denied</p>
        ) : (
          <video autoPlay muted playsInline className="preview"></video>
        )}
      </div>

      <div className="selectors">
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="any">Any Gender</option>
          <option value="boy">Boy</option>
          <option value="girl">Girl</option>
        </select>

        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="any">Any Country</option>
          <option value="us">🇺🇸 USA</option>
          <option value="in">🇮🇳 India</option>
          <option value="br">🇧🇷 Brazil</option>
          <option value="ru">🇷🇺 Russia</option>
          <option value="mx">🇲🇽 Mexico</option>
        </select>
      </div>

      <div className="actions">
        <button className="connect" onClick={handleConnect}>🔗 Connect</button>
        <button className="skip" onClick={handleSkip}>⏭️ Skip</button>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/plans" element={<UpgradePage />} />
        <Route path="/profile" element={<Profile user={user} onLogout={() => alert("Logged out")} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
