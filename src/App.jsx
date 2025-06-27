import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaGem, FaUserTie, FaChartBar } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import axios from "axios";
import "./App.css";

import Discover from "./Discover";
import Profile from "./Profile";
import Admin from "./Admin";
import UpgradePage from "./UpgradePage";
import Room from "./Room";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isRoom = location.pathname === "/call";
  const isHome = location.pathname === "/";
  const isDiscover = location.pathname === "/discover";
  const isPlans = location.pathname === "/plans";
  const isProfile = location.pathname === "/profile";

  const [cameraAllowed, setCameraAllowed] = useState(null);
  const [user, setUser] = useState(null);
  const [gender, setGender] = useState("any");
  const [country, setCountry] = useState("any");

  const email = "user@example.com";

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setCameraAllowed(true);
        const video = document.querySelector("video");
        if (video) video.srcObject = stream;
      })
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

  return (
    <div className="winkly">
      {/* Sidebar */}
      {!isRoom && (
        <div className="sidebar">
          <button onClick={() => navigate("/")}><FaHome size={20} color="#000" /></button>
          <button onClick={() => navigate("/discover")}><GiPartyPopper size={20} color="#000" /></button>
          <button onClick={() => navigate("/plans")}><FaGem size={20} color="#000" /></button>
          <button onClick={() => navigate("/profile")}><FaUserTie size={20} color="#000" /></button>
          <button onClick={() => navigate("/admin")}><FaChartBar size={20} color="#000" /></button>
        </div>
      )}

      {/* Main Panel */}
      {!isRoom && (
        <div className="main-panel">
          {isHome && (
            <>
              <h1 style={{ textAlign: "center", color: "#ffcc70" }}>Winkly Live ★</h1>
              <div className="selectors">
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="any">Any Gender</option>
                  <option value="boy">Boy</option>
                  <option value="girl">Girl</option>
                </select>
                <select value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="any">Any Country</option>
                  <option value="us">USA</option>
                  <option value="in">India</option>
                  <option value="br">Brazil</option>
                  <option value="ru">Russia</option>
                  <option value="mx">Mexico</option>
                </select>
                <div className="actions">
                  <button onClick={handleConnect}>Connect</button>
                </div>
              </div>

              {user && <p style={{ textAlign: "center", marginTop: 10 }}>💰 Coins: {user.coins} {user.vip && "(VIP 🔥 Unlimited)"}</p>}

              <div className="video-box">
                {cameraAllowed === false ? (
                  <p className="error">🚫 Camera access denied. Please allow camera in browser settings.</p>
                ) : (
                  <video autoPlay muted playsInline className="preview" />
                )}
              </div>

              <div className="chat-box">
                <p><strong>Matched with:</strong> {gender.toUpperCase()} from {country.toUpperCase()}</p>
                <div className="chat-message">💬 Waiting for message...</div>
              </div>
            </>
          )}

          {isPlans && <UpgradePage />}
          {isProfile && <Profile user={user} />}
          {isDiscover && <Discover gender={gender} country={country} />}
        </div>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/discover" element={<div />} />
        <Route path="/plans" element={<div />} />
        <Route path="/profile" element={<div />} />
        <Route path="/call" element={<Room />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<div />} />
      </Routes>
    </div>
  );
}

export default App;
