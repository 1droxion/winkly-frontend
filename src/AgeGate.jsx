import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Room() {
  const [search] = useSearchParams();
  const gender = search.get("gender") || "any";
  const country = search.get("country") || "any";
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const videoRef = useRef();

  // Simulate webcam stream
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(() => alert("Camera access denied"));
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: "You", text: input }]);
    setInput("");
  };

  return (
    <div style={{ padding: 20, textAlign: "center", background: "#000", color: "#fff", minHeight: "100vh" }}>
      <h2>Matched with: <span style={{ color: "#ffcc70" }}>{gender.toUpperCase()} from {country.toUpperCase()}</span></h2>

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "80%", maxWidth: 600, borderRadius: 16, border: "3px solid #ffcc70" }}
      ></video>

      <div style={{ marginTop: 20 }}>
        <div
          style={{
            height: 150,
            overflowY: "auto",
            background: "#111",
            color: "#fff",
            padding: 10,
            borderRadius: 8,
            textAlign: "left",
            maxWidth: 600,
            margin: "0 auto"
          }}
        >
          {messages.map((msg, i) => (
            <p key={i} style={{ margin: "5px 0" }}><strong>{msg.from}:</strong> {msg.text}</p>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Type message..."
            style={{ padding: 10, width: "60%", borderRadius: 8, border: "1px solid #555" }}
          />
          <button
            onClick={handleSend}
            style={{ marginLeft: 10, padding: "10px 20px", borderRadius: 8, background: "#ffcc70", color: "#000", border: "none" }}
          >
            Send
          </button>
        </div>
      </div>

      <div style={{ marginTop: 30, fontSize: "0.85rem", color: "#aaa" }}>
        <p><strong>Terms of Service:</strong> By using Winkly, you agree not to misuse or harass other users. You must be 18+ to use this platform.</p>
        <p><strong>Privacy Policy:</strong> We collect minimal data to improve your experience. We never share or sell your information.</p>
        <p><strong>Refund Policy:</strong> All purchases are final. We do not offer refunds for coins, VIP or gifts sent.</p>
      </div>
    </div>
  );
}
