import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FaHome, FaGem, FaUserTie, FaChartBar } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import "./App.css";

// Temporary page components
const Home = () => <h2>🏠 Welcome to Winkly</h2>;
const Discover = () => <h2>🎉 Discover Page</h2>;
const UpgradePage = () => <h2>💎 Upgrade Plans</h2>;
const Profile = () => <h2>🧑‍💼 Your Profile</h2>;
const Admin = () => <h2>📊 Admin Dashboard</h2>;

function App() {
  const navigate = useNavigate();
  const [cameraAllowed, setCameraAllowed] = useState(null);
  const [coins, setCoins] = useState(1);
  const [gender, setGender] = useState("any");
  const [country, setCountry] = useState("any");

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => setCameraAllowed(true))
      .catch(() => setCameraAllowed(false));
  }, []);

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
      <p>💰 Coins: {coins}</p>

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
        <button className="connect">🔗 Connect</button>
        <button className="skip">⏭️ Skip</button>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/plans" element={<UpgradePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
