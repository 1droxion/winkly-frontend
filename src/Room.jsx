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

        // Auto-skip after 20s
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
    <div style={{ padding: 20, textAlign: "center", background: "#000", color: "#fff", minHeight: "100vh" }}>
      <h2>Matched with: <span style={{ color: "#ffcc70" }}>{gender.toUpperCase()} from {country.toUpperCase()}</span></h2>

      {cameraAllowed === false ? (
        <p style={{ color: "red", marginBottom: 20 }}>🚫 Camera access denied. Please allow camera access in your browser settings.</p>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{ width: "80%", maxWidth: 600, borderRadius: 16, border: "3px solid #ffcc70" }}
          ></video>
          <div style={{ marginTop: 10 }}>
            <button onClick={toggleMic} style={{ margin: 5, padding: 10, borderRadius: 8, background: micOn ? "#ffcc70" : "#555", color: "#000" }}>
              {micOn ? "Mute Mic" : "Unmute Mic"}
            </button>
            <button onClick={toggleCam} style={{ margin: 5, padding: 10, borderRadius: 8, background: camOn ? "#ffcc70" : "#555", color: "#000" }}>
              {camOn ? "Turn Off Camera" : "Turn On Camera"}
            </button>
          </div>
        </>
      )}

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
    </div>
  );
}
