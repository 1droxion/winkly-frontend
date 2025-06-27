// src/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email.includes("@")) return alert("Enter valid email");

    axios.post("https://winkly-backend.onrender.com/get-user", { email })
      .then(res => {
        localStorage.setItem("winkly_user", JSON.stringify(res.data.user));
        navigate("/");
      })
      .catch(() => alert("Login failed"));
  };

  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <h1 style={{ color: "#ffd700", marginBottom: 20 }}>Winkly Login</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "10px 16px",
          borderRadius: "10px",
          border: "1px solid #888",
          width: "80%",
          maxWidth: 300,
          fontSize: "1rem",
          marginBottom: 20
        }}
      />
      <br />
      <button
        onClick={handleLogin}
        style={{
          background: "#ffd700",
          color: "#000",
          padding: "10px 24px",
          fontWeight: "bold",
          borderRadius: "10px",
          border: "none",
          fontSize: "1rem",
          cursor: "pointer"
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
