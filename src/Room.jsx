// === Room.jsx ===
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function Room() {
  const { roomId } = useParams();
  const localRef = useRef(null);
  const remoteRef = useRef(null);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (localRef.current) localRef.current.srcObject = stream;
    });

    const ws = new WebSocket(`wss://winkly-signaling.onrender.com/room/${roomId}`);
    setSocket(ws);

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "chat") {
        setChat((prev) => [...prev, { from: "👤", text: data.text }]);
      }
    };

    return () => ws.close();
  }, [roomId]);

  const sendMsg = () => {
    if (!message || !socket) return;
    socket.send(JSON.stringify({ type: "chat", text: message }));
    setChat((prev) => [...prev, { from: "You", text: message }]);
    setMessage("");
  };

  return (
    <div className="app">
      <h2 className="logo">🔴 Video Room: {roomId}</h2>

      <div style={{ display: "flex", gap: 10 }}>
        <video ref={localRef} autoPlay muted style={{ width: "48%", borderRadius: 10 }} />
        <video ref={remoteRef} autoPlay style={{ width: "48%", borderRadius: 10 }} />
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={{ maxHeight: 200, overflowY: "auto", background: "#111", padding: 10, borderRadius: 10 }}>
          {chat.map((c, i) => (
            <p key={i}><strong>{c.from}:</strong> {c.text}</p>
          ))}
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type message..."
            style={{ flex: 1, padding: 10, borderRadius: 8 }}
          />
          <button className="vip-btn" onClick={sendMsg}>Send</button>
        </div>
      </div>
    </div>
  );
}
