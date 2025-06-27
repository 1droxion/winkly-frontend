// src/Profile.jsx
import React from "react";

function Profile({ user, onLogout }) {
  if (!user) {
    return (
      <div style={{ textAlign: "center", paddingTop: "80px" }}>
        <h2 style={{ color: "#ffcc70", fontSize: "1.6rem" }}>Loading profile...</h2>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "40px 20px", maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ color: "#ffcc70", marginBottom: "20px", fontSize: "2rem" }}>👤 My Profile</h1>

      <div style={{
        background: "rgba(255, 255, 255, 0.05)",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 0 10px rgba(0,0,0,0.4)"
      }}>
        <img
          src="https://i.imgur.com/3GvwNBf.png"
          alt="User Avatar"
          style={{ width: 120, height: 120, borderRadius: "50%", marginBottom: 10 }}
        />

        <h2 style={{ margin: "10px 0", fontSize: "1.2rem" }}>{user.email}</h2>
        <p style={{ fontSize: "1rem", color: "#ccc" }}>💰 Coins: <strong>{user.coins}</strong></p>
        <p style={{ fontSize: "1rem", color: "#ccc" }}>🔥 VIP: <strong>{user.vip ? "Yes ✅" : "No ❌"}</strong></p>

        <button
          onClick={onLogout || (() => alert("Logged out!"))}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#ff4757",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ marginTop: "40px", fontSize: "0.85rem", color: "#aaa" }}>
        <p><strong>Terms:</strong> 18+ required. No harassment or nudity allowed.</p>
        <p><strong>Privacy:</strong> We don’t share personal data.</p>
        <p><strong>No Refunds:</strong> All purchases are final.</p>
      </div>
    </div>
  );
}

export default Profile;
