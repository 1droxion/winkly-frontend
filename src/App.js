import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Profile from "./Profile";
import Admin from "./Admin";
import Discover from "./Discover";
import Room from "./Room";

function MainApp() {
  const localVideoRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState(null);
  const [gender, setGender] = useState("Any Gender");
  const [country, setCountry] = useState("Any Country");
  const [view, setView] = useState("app");
  const [cameraDenied, setCameraDenied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("winkly_user");
    if (saved) setUser(JSON.parse(saved));

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Camera access denied:", err);
        setCameraDenied(true);
      });
  }, []);

  const Plans = () => (
    <div className="app">
      <h2 className="logo">💎 Upgrade Plan</h2>
      <div className="btn-group">
        <a href="https://buy.stripe.com/14AaEX0vr3NidTX0SS97G03" target="_blank">
          <button>5 Coins – $1.99</button>
        </a>
        <a href="https://buy.stripe.com/aFa7sL91X83y17bfNM97G04" target="_blank">
          <button>20 Coins – $5</button>
        </a>
        <a href="https://buy.stripe.com/14AfZh0vrbfK3fj8lk97G05" target="_blank">
          <button>50 Coins – $9.99</button>
        </a>
        <a href="https://buy.stripe.com/dRm3cvemh4Rm9DH9po97G06" target="_blank">
          <button className="vip-btn">👑 Unlock VIP – $19.99</button>
        </a>
      </div>
    </div>
  );

  const handleConnect = async () => {
    if (!user) return alert("Please login first.");
    if (user.guest) return alert("Guest users can only connect once.");
    if (!user.vip && (gender !== "Any Gender" || country !== "Any Country")) {
      return alert("VIP only! Unlock filters.");
    }
    if (user.coins <= 0) return alert("Buy more coins to connect.");

    try {
      const res = await fetch("https://winkly-backend.onrender.com/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gender, country })
      });

      const data = await res.json();
      if (data.matched) {
        const roomId = Math.random().toString(36).substring(7);
        alert("🎉 Matched! Redirecting...");
        navigate(`/room/${roomId}`);
      } else {
        alert("⏳ Waiting for someone to join...");
      }
    } catch (err) {
      alert("❌ Match failed.");
    }
  };

  const Sidebar = () => (
    <div className="sidebar">
      <button onClick={() => setView("app")}>🏠 Home</button>
      <button onClick={() => setView("discover")}>💃 Discover</button>
      <button onClick={() => setView("plans")}>💎 Plans</button>
      <button onClick={() => setView("profile")}>👤 Profile</button>
      <button onClick={() => setView("admin")}>📊 Admin</button>
    </div>
  );

  if (!user) return <Login onLogin={(u) => { setUser(u); setView("app"); }} />;
  if (view === "admin") return <><Admin /><Sidebar /></>;
  if (view === "discover") return <><Discover /><Sidebar /></>;
  if (view === "plans") return <><Plans /><Sidebar /></>;
  if (view === "profile") return (
    <>
      <Profile
        user={user}
        onLogout={() => {
          setUser(null);
          localStorage.removeItem("winkly_user");
          setView("login");
        }}
      />
      <Sidebar />
    </>
  );

  return (
    <div className="app">
      <Sidebar />
      <h1 className="logo">Winkly ✯</h1>

      <div className="coin-bar">
        💰 Coins: {user.coins}
        {user.vip && <span className="vip">👑 VIP</span>}
      </div>

      <div className="video-frame">
        <video ref={localVideoRef} autoPlay muted playsInline />
        {!connected && !cameraDenied && <span>🎥 Your Video Preview</span>}
        {cameraDenied && <span>🚫 Camera access denied</span>}
      </div>

      <div className="filter-bar">
        <div className="custom-dropdown">
          <div className="dropdown-btn">{gender}</div>
          <div className="dropdown-list">
            <div onClick={() => setGender("Any Gender")}>Any Gender</div>
            <div onClick={() => setGender("Boy")}>Boy</div>
            <div onClick={() => setGender("Girl")}>Girl</div>
          </div>
        </div>

        <div className="custom-dropdown">
          <div className="dropdown-btn">{country}</div>
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

      <div className="btn-group">
        <button onClick={handleConnect} disabled={user.coins <= 0}>🔄 Connect</button>
        <button onClick={() => setConnected(false)}>⏭️ Skip</button>
      </div>
    </div>
  );
}

export default function Wrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </Router>
  );
}
