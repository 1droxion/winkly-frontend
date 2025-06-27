// src/App.jsx
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
import Room from "./Room";

function App() {
  const navigate = useNavigate();
  const [cameraAllowed, setCameraAllowed] = useState(null);
  const [user, setUser] = useState(null);
  const [gender, setGender] = useState("any");
  const [country, setCountry] = useState("any");
  const [ageConfirmed, setAgeConfirmed] = useState(localStorage.getItem("ageConfirmed") === "true");
  const email = "user@example.com";
  const isRoomRoute = window.location.pathname === "/call";

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

    if (!ageConfirmed) {
      const confirmed = window.confirm("This platform is for 18+ users only. Do you confirm you're over 18?");
      if (confirmed) {
        localStorage.setItem("ageConfirmed", "true");
        setAgeConfirmed(true);
      } else {
        alert("You must be 18+ to access Winkly.");
        window.location.href = "https://google.com";
      }
    }
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
    alert("⏭️ Skipping to next match...");
  };

  return (
    <div className="winkly">
      {!isRoomRoute && (
        <>
          {/* Sidebar */}
          <div className="sidebar">
            <button onClick={() => navigate("/")}><FaHome size={20} color="#000" /></button>
            <button onClick={() => navigate("/discover")}><GiPartyPopper size={20} color="#000" /></button>
            <button onClick={() => navigate("/plans")}><FaGem size={20} color="#000" /></button>
            <button onClick={() => navigate("/profile")}><FaUserTie size={20} color="#000" /></button>
            <button onClick={() => navigate("/admin")}><FaChartBar size={20} color="#000" /></button>
          </div>

          {/* Main Panel */}
          <div className="main-panel">
            <h1>Winkly Live ★</h1>

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
                <button onClick={handleSkip}>Skip</button>
              </div>
            </div>

            {user && <p style={{ marginTop: 10 }}>💰 Coins: {user.coins} {user.vip && "(VIP 🔥 Unlimited)"}</p>}

            <div className="video-box">
              {cameraAllowed === false ? (
                <p className="error">🚫 Camera access denied. Please allow camera in browser settings.</p>
              ) : (
                <video autoPlay muted playsInline className="preview" />
              )}
            </div>

            <div className="chat-box">
              <p><strong>Matched with:</strong> ANY from ANY</p>
              <div className="chat-message">💬 Waiting for message...</div>
            </div>

            <div className="legal">
              <p><strong>Terms of Service:</strong> You must be 18+ to use this platform.</p>
              <p><strong>Privacy Policy:</strong> We don’t sell or share personal info.</p>
              <p><strong>No Refund Policy:</strong> All payments are final and non-refundable.</p>
            </div>
          </div>
        </>
      )}

      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/plans" element={<UpgradePage />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/call" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
