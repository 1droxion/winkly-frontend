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

const Home = () => <></>;

function App() {
  const navigate = useNavigate();
  const [cameraAllowed, setCameraAllowed] = useState(null);
  const [user, setUser] = useState(null);
  const [gender, setGender] = useState("any");
  const [country, setCountry] = useState("any");
  const email = "user@example.com";
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
    alert("⏭️ Skipping to next match...");
  };

  return (
    <div className="winkly">
      <AgeGate />

      {!isRoomRoute && (
        <>
          <div style={{ textAlign: "center", paddingTop: 20 }}>
            <h1 style={{ fontSize: "2rem", color: "#ffcc70" }}>Winkly Live ★</h1>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
            <button onClick={() => navigate("/")}><FaHome color="#000" /></button>
            <button onClick={() => navigate("/discover")}><GiPartyPopper color="#000" /></button>
            <button onClick={() => navigate("/plans")}><FaGem color="#000" /></button>
            <button onClick={() => navigate("/profile")}><FaUserTie color="#000" /></button>
            <button onClick={() => navigate("/admin")}><FaChartBar color="#000" /></button>

            <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ padding: "6px 12px", borderRadius: 10, background: "#000", color: "#fff" }}>
              <option value="any">Any Gender</option>
              <option value="boy">Boy</option>
              <option value="girl">Girl</option>
            </select>

            <select value={country} onChange={(e) => setCountry(e.target.value)} style={{ padding: "6px 12px", borderRadius: 10, background: "#000", color: "#fff" }}>
              <option value="any">Any Country</option>
              <option value="us">USA</option>
              <option value="in">India</option>
              <option value="br">Brazil</option>
              <option value="ru">Russia</option>
              <option value="mx">Mexico</option>
            </select>

            <button onClick={handleConnect} style={{ background: "#000", color: "#fff", padding: "8px 16px", borderRadius: 10, border: "none" }}>Connect</button>
            <button onClick={handleSkip} style={{ background: "#000", color: "#fff", padding: "8px 16px", borderRadius: 10, border: "none" }}>Skip</button>
          </div>

          <div style={{ textAlign: "center", marginTop: 30 }}>
            {user && <p>💰 Coins: {user.coins} {user.vip && "(VIP 🔥 Unlimited)"}</p>}
          </div>

          <div className="video-box">
            {cameraAllowed === false ? (
              <p className="error">🚫 Camera access denied. Please allow camera in browser settings.</p>
            ) : (
              <video autoPlay muted playsInline className="preview"></video>
            )}
          </div>

          <footer style={{ marginTop: 40, fontSize: "0.85rem", color: "#aaa", textAlign: "center" }}>
            <p><strong>Terms of Service:</strong> You must be 18+ to use this platform. Harassment, nudity, or abuse is banned.</p>
            <p><strong>Privacy Policy:</strong> We only store essential data to run the platform. We don’t sell or share personal info.</p>
            <p><strong>No Refund Policy:</strong> All payments (VIP, Coins, Gifts) are final and non-refundable.</p>
          </footer>
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
    </div>
  );
}

export default App;
