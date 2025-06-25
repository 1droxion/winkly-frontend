// === Login.jsx ===
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    const url = isLogin
      ? "https://winkly-backend.onrender.com/login"
      : "https://winkly-backend.onrender.com/register";
    const res = await axios.post(url, { email, password });
    if (res.data?.user) {
      localStorage.setItem("winkly_user", JSON.stringify(res.data.user));
      onLogin(res.data.user);
    } else {
      alert(res.data?.error || "Failed");
    }
  };

  return (
    <div className="app">
      <h2 className="logo">{isLogin ? "Login" : "Register"}</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "12px", borderRadius: "8px", marginBottom: 10, width: "100%" }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "12px", borderRadius: "8px", marginBottom: 10, width: "100%" }}
      />
      <button className="vip-btn" onClick={handleAuth}>
        {isLogin ? "🔐 Login" : "🆕 Register"}
      </button>
      <p>
        {isLogin ? "New user? " : "Have an account? "}
        <span style={{ color: "skyblue", cursor: "pointer" }} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register here" : "Login"}
        </span>
      </p>
    </div>
  );
}

// === Profile.jsx ===
import React from "react";

export default function Profile({ user, onLogout }) {
  return (
    <div className="app">
      <h2 className="logo">👤 Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Coins:</strong> {user.coins}</p>
      <p><strong>Status:</strong> {user.vip ? "👑 VIP" : "Free User"}</p>
      <button className="dropdown-btn" onClick={() => {
        localStorage.removeItem("winkly_user");
        onLogout();
      }}>🚪 Logout</button>
    </div>
  );
}
