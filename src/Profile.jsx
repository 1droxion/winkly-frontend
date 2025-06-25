import React from "react";

export default function Profile({ user, onLogout, children }) {
  const earning = user.gifts_received * 0.05; // $0.05 per gift

  return (
    <div className="app">
      <h2 className="logo">👤 Profile</h2>

      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Coins:</strong> {user.coins}</p>
      <p><strong>Status:</strong> {user.vip ? "👑 VIP" : "Free User"}</p>
      <p><strong>Gifts Received:</strong> 🎁 {user.gifts_received}</p>
      <p><strong>Estimated Earnings:</strong> ${earning.toFixed(2)}</p>

      <button className="dropdown-btn" onClick={onLogout}>🚪 Logout</button>

      <div style={{ marginTop: "1rem" }}>
        {children}
      </div>
    </div>
  );
}
