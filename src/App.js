import React, { useEffect, useRef, useState } from "react";

const BACKEND_URL = "https://backend-winkly.onrender.com";

export default function App() {
  const localVideoRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [coins, setCoins] = useState(5);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      });
  }, []);

  const handleConnect = async () => {
    const res = await fetch(`${BACKEND_URL}/match`);
    const data = await res.json();
    if (data?.matched) {
      setConnected(true);
      setCoins(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    setConnected(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>Winkly 🚀</h1>

      <video ref={localVideoRef} autoPlay muted style={styles.video} />

      <div style={styles.controls}>
        <button onClick={handleConnect} style={styles.button}>🔄 Connect</button>
        <button onClick={handleSkip} style={styles.button}>⏭️ Skip</button>
      </div>

      <p style={styles.coins}>💰 Coins: {coins}</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    background: "#000",
    height: "100vh",
    color: "#fff",
    padding: "20px"
  },
  logo: {
    fontSize: "2rem"
  },
  video: {
    width: "60%",
    maxHeight: "60vh",
    borderRadius: "20px",
    marginTop: "20px"
  },
  controls: {
    marginTop: "20px"
  },
  button: {
    margin: "10px",
    padding: "12px 24px",
    fontSize: "1rem",
    borderRadius: "10px",
    backgroundColor: "#222",
    color: "#fff",
    border: "1px solid #444",
    cursor: "pointer"
  },
  coins: {
    marginTop: "20px",
    fontSize: "1.1rem"
  }
};
