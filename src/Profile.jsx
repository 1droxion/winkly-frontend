import React, { useState } from "react";
import axios from "axios";

export default function Profile({ user, onLogout, children }) {
  const [withdrawStatus, setWithdrawStatus] = useState(null);
  const earning = user.gifts_received * 0.05;
  const payout = (earning * 0.8).toFixed(2); // 20% platform cut

  const handleWithdraw = async () => {
    const method = prompt("Enter payout method (e.g. PayPal, UPI, Bank):");
    const address = prompt("Enter your payout address (email/UPI ID):");
    const amount = parseFloat(prompt(`Enter amount to withdraw (max $${earning.toFixed(2)}):`));

    if (!method || !address || !amount) return alert("All fields are required.");
    if (amount > earning) return alert("You cannot withdraw more than your earnings.");

    try {
      const res = await axios.post("https://winkly-backend.onrender.com/withdraw-request", {
        email: user.email,
        method,
        address,
        amount
      });
      if (res.data.success) {
        setWithdrawStatus(`✅ Withdraw request sent! You will receive ~$${res.data.payout_after_fee}`);
      } else {
        setWithdrawStatus(`❌ ${res.data.error}`);
      }
    } catch (err) {
      setWithdrawStatus("❌ Something went wrong.");
    }
  };

  return (
    <div className="app">
      <h2 className="logo">👤 Profile</h2>

      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Coins:</strong> {user.coins}</p>
      <p><strong>Status:</strong> {user.vip ? "👑 VIP" : "Free User"}</p>
      <p><strong>Gifts Received:</strong> 🎁 {user.gifts_received}</p>
      <p><strong>Estimated Earnings:</strong> ${earning.toFixed(2)} (💸 You’ll get: ${payout})</p>

      {user.is_girl && (
        <>
          <button className="vip-btn" onClick={handleWithdraw}>
            💸 Request Withdraw
          </button>
          {withdrawStatus && <p style={{ marginTop: 10 }}>{withdrawStatus}</p>}
        </>
      )}

      <button className="dropdown-btn" onClick={onLogout}>🚪 Logout</button>
      <div style={{ marginTop: "1rem" }}>{children}</div>
    </div>
  );
}
