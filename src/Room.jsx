import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Room() {
  const [search] = useSearchParams();
  const gender = search.get("gender") || "any";
  const country = search.get("country") || "any";
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const videoRef = useRef();
  const [cameraAllowed, setCameraAllowed] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  useEffect(() => {
    const getStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoRef.current.srcObject = stream;
        setCameraAllowed(true);

        const timer = setTimeout(() => {
          alert("Auto-skipping to next match...");
          window.location.reload();
        }, 20000);

        return () => clearTimeout(timer);
      } catch {
        setCameraAllowed(false);
      }
    };
    getStream();
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: "You", text: input }]);
    setInput("");
  };

  const toggleMic = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getAudioTracks().forEach(track => track.enabled = !micOn);
      setMicOn(prev => !prev);
    }
  };

  const toggleCam = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getVideoTracks().forEach(track => track.enabled = !camOn);
      setCamOn(prev => !prev);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#000", color: "#fff" }}>
      <div style={{ width: 80, background: "#ffcc70", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20 }}>
        <button onClick={() => window.location.href = "/"} style={{ margin: 10 }}>🏠</button>
        <button onClick={toggleMic} style={{ margin: 10 }}>{micOn ? "🎙️" : "🔇"}</button>
        <button onClick={toggleCam} style={{ margin: 10 }}>{camOn ? "📹" : "🚫"}</button>
        <button onClick={() => window.location.href = "/profile"} style={{ margin: 10 }}>👤</button>
      </div>

      <div style={{ flex: 1, padding: 20, overflow: "hidden" }}>
        <h2>Matched with: <span style={{ color: "#ffcc70" }}>{gender.toUpperCase()} from {country.toUpperCase()}</span></h2>

        <div style={{ display: "flex", gap: 20, height: "calc(100% - 80px)" }}>
          <div style={{ flex: 1 }}>
            {cameraAllowed === false ? (
              <p style={{ color: "red", marginBottom: 20 }}>🚫 Camera access denied. Please allow camera access in your browser settings.</p>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{ width: "100%", height: "100%", borderRadius: 16, border: "3px solid #ffcc70", objectFit: "cover" }}
              ></video>
            )}
          </div>

          <div style={{ width: 300, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ flex: 1, overflowY: "auto", background: "#111", padding: 10, borderRadius: 8 }}>
              {messages.map((msg, i) => (
                <p key={i} style={{ margin: "5px 0" }}><strong>{msg.from}:</strong> {msg.text}</p>
              ))}
            </div>

            <div style={{ display: "flex", marginTop: 10 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Type message..."
                style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #555" }}
              />
              <button
                onClick={handleSend}
                style={{ marginLeft: 10, padding: "10px 20px", borderRadius: 8, background: "#ffcc70", color: "#000", border: "none" }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
