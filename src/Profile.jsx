// src/Profile.jsx
import React from "react";

function Profile({ user, onLogout }) {
  if (!user) {
    return (
      <div style={{ textAlign: "center", paddingTop: "80px" }}>
        <h2>Loading profile...</h2>
      </div>
    );
  }

  return (
    <div className="main-panel" style={{ textAlign: "center", paddingTop: "40px", maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ color: "#ffcc70", marginBottom: "20px" }}>👤 My Profile</h1>

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

        <h2 style={{ margin: "10px 0" }}>{user.email}</h2>

        <p>💰 Coins: <strong>{user.coins}</strong></p>
        <p>🔥 VIP: <strong>{user.vip ? "Yes ✅" : "No ❌"}</strong></p>

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

      <div className="legal" style={{ marginTop: "40px" }}>
        <p><strong>Terms of Service:</strong> You must be 18+ to use this platform.</p>
        <p><strong>Privacy Policy:</strong> We don’t sell or share personal info.</p>
        <p><strong>No Refund Policy:</strong> All payments are final and non-refundable.</p>
      </div>
    </div>
  );
}

export default Profile;
