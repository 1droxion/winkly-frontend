import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Room() {
  const [search] = useSearchParams();
  const gender = search.get("gender") || "any";
  const country = search.get("country") || "any";

  const [message, setMessage] = useState("Waiting for message...");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [stream, setStream] = useState(null);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setStream(stream);
        videoRef.current.srcObject = stream;
        setMessage("🔗 Connected to match!");
      })
      .catch(() => setMessage("🚫 Camera access denied"));
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: "you", text: input.trim() }]);
    setInput("");
  };

  const handleSkip = () => {
    setLoading(true);
    setTimeout(() => {
      setMessages([]);
      setMessage("🔗 Connected to new match!");
      setLoading(false);
    }, 2000);
  };

  const toggleCamera = () => {
    if (!stream) return;
    stream.getVideoTracks().forEach(track => track.enabled = !cameraOn);
    setCameraOn(!cameraOn);
  };

  const toggleMic = () => {
    if (!stream) return;
    stream.getAudioTracks().forEach(track => track.enabled = !micOn);
    setMicOn(!micOn);
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", color: "#ffd700", marginBottom: 20 }}>Winkly Live ★</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 20 }}>
        <button onClick={toggleCamera} style={{ padding: "10px 16px", borderRadius: 10, background: cameraOn ? "#ffd700" : "#999", border: "none" }}>
          {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
        </button>
        <button onClick={toggleMic} style={{ padding: "10px 16px", borderRadius: 10, background: micOn ? "#ffd700" : "#999", border: "none" }}>
          {micOn ? "Mute" : "Unmute"}
        </button>
        <button onClick={handleSkip} style={{ padding: "10px 20px", background: "#ff6666", color: "white", borderRadius: 10, border: "none" }}>Skip</button>
      </div>

      {loading ? (
        <div style={{ color: "#ccc", padding: 40 }}>🔄 Loading next match...</div>
      ) : (
        <>
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
            marginTop: 20,
            background: "#111",
            padding: "10px 16px",
            borderRadius: 12,
            width: "100%",
            maxWidth: 500,
            marginInline: "auto"
          }}>
            <div style={{ minHeight: 80, marginBottom: 10, color: "#ccc", fontSize: "0.95rem", textAlign: "left" }}>
              {messages.length === 0 ? (
                <span>💬 {message}</span>
              ) : (
                messages.map((msg, i) => (
                  <div key={i} style={{ marginBottom: 4 }}>
                    <strong>{msg.sender}:</strong> {msg.text}
                  </div>
                ))
              )}
            </div>
            <div style={{ display: "flex" }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Type message..."
                style={{ flex: 1, padding: 8, borderRadius: 8, border: "none", outline: "none" }}
              />
              <button
                onClick={handleSend}
                style={{ marginLeft: 8, padding: "8px 16px", background: "#ffd700", color: "#000", fontWeight: "bold", borderRadius: 8, border: "none" }}>
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
