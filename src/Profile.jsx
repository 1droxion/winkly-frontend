import React from "react";

export default function Profile({ user, onLogout, children }) {
  if (!user || !user.email) {
    return (
      <div className="app">
        <h2 className="logo">👤 Guest Profile</h2>
        <p>You are currently using Winkly as a <strong>Guest</strong>.</p>
        <p>To access your wallet, coins, and profile — please register or log in.</p>
        <button className="vip-btn" onClick={onLogout}>🔐 Login / Register</button>
      </div>
    );
  }

  const earning = user.gifts_received * 0.05;

  return (
    <div className="app">
      <h2 className="logo">👤 Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Coins:</strong> {user.coins}</p>
      <p><strong>Status:</strong> {user.vip ? "👑 VIP" : "Free User"}</p>
      <p><strong>Gifts Received:</strong> 🎁 {user.gifts_received}</p>
      <p><strong>Estimated Earnings:</strong> ${earning.toFixed(2)}</p>
      <button className="dropdown-btn" onClick={onLogout}>🚪 Logout</button>
      <div style={{ marginTop: "1rem" }}>{children}</div>
    </div>
  );
}
