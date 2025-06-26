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
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Matched with: <span style={{ color: "#ffcc70" }}>{gender.toUpperCase()} from {country.toUpperCase()}</span></h2>
      <video ref={videoRef} autoPlay muted playsInline style={{ width: "80%", borderRadius: 16 }}></video>

      <div style={{ marginTop: 20 }}>
        <div style={{ height: 150, overflowY: "auto", background: "#111", color: "#fff", padding: 10, borderRadius: 8 }}>
          {messages.map((msg, i) => (
            <p key={i}><strong>{msg.from}:</strong> {msg.text}</p>
          ))}
        </div>

        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Type message..."
          style={{ marginTop: 10, padding: 10, width: "70%", borderRadius: 8 }}
        />
        <button onClick={handleSend} style={{ marginLeft: 10, padding: 10, borderRadius: 8 }}>Send</button>
      </div>
    </div>
  );
}
