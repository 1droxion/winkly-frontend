import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Room() {
  const [search] = useSearchParams();
  const gender = search.get("gender") || "any";
  const country = search.get("country") || "any";

  const [message, setMessage] = useState("Waiting for message...");
  const [stream, setStream] = useState(null);
  const [connected, setConnected] = useState(false);

  const videoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setStream(stream);
        videoRef.current.srcObject = stream;
        setMessage("🔗 Connected to match!");
        setConnected(true);
      })
      .catch(() => {
        setMessage("🚫 Camera access denied");
        setConnected(false);
      });
  }, []);

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", color: "#ffd700", marginBottom: 20 }}>Winkly Live ★</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 20 }}>
        <select value={gender} disabled style={{ padding: 10, borderRadius: 8 }}>
          <option>{gender}</option>
        </select>
        <select value={country} disabled style={{ padding: 10, borderRadius: 8 }}>
          <option>{country}</option>
        </select>
        <button style={{ padding: "10px 20px", background: "#ffd700", border: "none", borderRadius: 10 }}>Connect</button>
      </div>

      <video ref={videoRef} autoPlay playsInline muted style={{
        width: "100%",
        maxWidth: 480,
        borderRadius: 16,
        border: "3px solid #ffd700",
        boxShadow: "0 0 20px #ffd700aa"
      }} />

      <p style={{ marginTop: 20, fontWeight: "bold", color: "#ccc" }}>
        Matched with: <span style={{ color: "#ffd700" }}>{gender.toUpperCase()}</span> from <span style={{ color: "#ffd700" }}>{country.toUpperCase()}</span>
      </p>

      <div style={{
        marginTop: 16,
        background: "#222",
        color: "#ccc",
        padding: "10px 16px",
        borderRadius: 10,
        display: "inline-block"
      }}>
        💬 {message}
      </div>
    </div>
  );
}
