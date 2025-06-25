// === Discover.jsx with gift buttons ===
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Discover() {
  const [girls, setGirls] = useState([]);
  const [selected, setSelected] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/girls.json")
      .then((res) => res.json())
      .then((data) => setGirls(data));

    const saved = localStorage.getItem("winkly_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const sendGift = async (gift) => {
    if (!user || !user.email) return alert("Please log in to send gifts.");
    if (user.guest) return alert("Guests cannot send gifts.");
    if (!selected || !selected.name) return;

    const to = selected.name.toLowerCase() + "@demo.com"; // fake target email for demo

    try {
      const res = await axios.post("https://winkly-backend.onrender.com/send-gift", {
        from: user.email,
        to,
        gift
      });
      alert(res.data.message || "Gift sent!");
    } catch (err) {
      alert("Failed to send gift");
    }
  };

  return (
    <div className="app">
      <h1 className="logo">💃 Discover Girls</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "1rem",
        marginTop: "1rem",
        width: "100%"
      }}>
        {girls.map((girl, idx) => (
          <div key={idx} style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "1rem",
            textAlign: "center",
            cursor: "pointer"
          }} onClick={() => setSelected(girl)}>
            <img src={girl.image} alt={girl.name} style={{ width: "100%", borderRadius: "10px" }} />
            <h3 style={{ marginTop: "0.5rem" }}>{girl.name}</h3>
            <p>{girl.country}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <h2>🎥 Preview: {selected.name}</h2>
          <img src={selected.image} alt="preview" style={{ maxWidth: 200, borderRadius: 16 }} />
          <p style={{ marginTop: 10 }}>{selected.country}</p>

          <div className="btn-group" style={{ marginTop: 10 }}>
            <button onClick={() => sendGift("rose")}>🌹 Rose</button>
            <button onClick={() => sendGift("heart")}>❤️ Heart</button>
            <button onClick={() => sendGift("diamond")}>💎 Diamond</button>
          </div>

          <button className="dropdown-btn" onClick={() => setSelected(null)} style={{ marginTop: 12 }}>❌ Close</button>
        </div>
      )}
    </div>
  );
}
