import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("https://winkly-backend.onrender.com/admin-stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return <div className="app"><h2>📊 Loading admin data...</h2></div>;

  return (
    <div className="app">
      <h1 className="logo">Admin Dashboard 📈</h1>
      <div style={{ display: "grid", gap: "1.2rem", width: "100%" }}>
        <Card title="👥 Total Users" value={stats.users} />
        <Card title="👑 VIP Members" value={stats.vip} />
        <Card title="💰 Total Coins" value={stats.coins} />
        <Card title="🎁 Total Gifts Sent" value={stats.gifts} />
        <Card title="💃 Total Girls Registered" value={stats.girls} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.08)",
      borderRadius: "16px",
      padding: "1.2rem",
      boxShadow: "0 0 12px rgba(255,255,255,0.1)"
    }}>
      <h3 style={{ fontSize: "1.1rem", color: "#ccc", marginBottom: 4 }}>{title}</h3>
      <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#fff" }}>{value}</div>
    </div>
  );
}
