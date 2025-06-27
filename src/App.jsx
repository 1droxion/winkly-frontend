import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FaHome, FaGem, FaUserTie, FaChartBar } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import axios from "axios";
import "./App.css";

import Discover from "./Discover";
import Profile from "./Profile";
import Admin from "./Admin";
import UpgradePage from "./UpgradePage";
import AgeGate from "./AgeGate";
import Room from "./Room";

const Home = () => <h2>🏠 Welcome to Winkly</h2>;

function App() {
  const navigate = useNavigate();
  const [cameraAllowed, setCameraAllowed] = useState(null);
  const [user, setUser] = useState(null);
  const [gender, setGender] = useState("any");
  const [country, setCountry] = useState("any");
  const [bot, setBot] = useState(null);

  const email = "user@example.com"; // replace with real session later
  const isRoomRoute = window.location.pathname === "/call";

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(() => setCameraAllowed(true))
      .catch(() => setCameraAllowed(false));

    axios.post("https://winkly-backend.onrender.com/get-user", { email })
      .then(res => setUser(res.data.user))
      .catch(() => alert("Failed to load user"));
  }, []);

  const handleConnect = () => {
    if (!user) return;
    if (!user.vip && user.coins <= 0) {
      alert("❌ You need more coins. Please upgrade or buy more.");
      return;
    }

    if (!user.vip) {
      axios.post("https://winkly-backend.onrender.com/update-coins", {
        email,
        amount: -1
      }).then(res => setUser({ ...user, coins: res.data.coins }));
    }

    const callURL = `https://winkly-frontend-fmax.vercel.app/call?gender=${gender}&country=${country}`;
    window.open(callURL, "_blank");
  };

  const handleSkip = () => {
    axios.get("https://winkly-backend.onrender.com/fake-users")
      .then(res => {
        const bots = res.data;
        const random = bots[Math.floor(Math.random() * bots.length)];
        setBot(random);
      })
      .catch(() => {
        setBot({
          name: "Luna",
          country: "IN",
          gender: "girl",
          photo: "https://randomuser.me/api/portraits/women/5.jpg"
        });
      });
  };

  return (
    <div className="winkly">
      <AgeGate />

      {!isRoomRoute && (
        <div className="topbar" style={{ background: "#ffcc70", padding: "10px 0", display: "flex", justifyContent: "center", gap: 16 }}>
          <button onClick={() => navigate("/")} title="Home"><FaHome /></button>
          <button onClick={() => navigate("/discover")} title="Discover"><GiPartyPopper /></button>
          <button onClick={() => navigate("/plans")} title="Plans"><FaGem /></button>
          <button onClick={() => navigate("/profile")} title="Profile"><FaUserTie /></button>
          <button onClick={() => navigate("/admin")} title="Admin"><FaChartBar /></button>
        </div>
      )}

      {!isRoomRoute && (
        <>
          <h1>Winkly ★</h1>
          {user && <p>💰 Coins: {user.coins} {user.vip && "(VIP 💫 Unlimited)"}</p>}

          <div className="video-box">
            {cameraAllowed === false ? (
              <p className="error">🛘 Camera access denied. Please allow camera in browser settings.</p>
            ) : (
              <video autoPlay muted playsInline className="preview"></video>
            )}
          </div>

          {bot && (
            <div className="bot-preview">
              <img src={bot.photo} alt="bot" width="80" style={{ borderRadius: "50%" }} />
              <p><strong>{bot.name}</strong> ({bot.gender}, {bot.country})</p>
            </div>
          )}

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
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/plans" element={<UpgradePage />} />
        <Route path="/profile" element={<Profile user={user} onLogout={() => alert("Logout")} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/call" element={<Room />} />
      </Routes>

      {!isRoomRoute && (
        <footer style={{ marginTop: 50, padding: 20, fontSize: "0.85rem", color: "#aaa", textAlign: "center" }}>
          <p><strong>Terms of Service:</strong> You must be 18+ to use this platform. Harassment, nudity, or abuse is banned.</p>
          <p><strong>Privacy Policy:</strong> We only store essential data to run the platform. We don’t sell or share personal info.</p>
          <p><strong>No Refund Policy:</strong> All payments (VIP, Coins, Gifts) are final and non-refundable.</p>
        </footer>
      )}
    </div>
  );
}

export default App;
