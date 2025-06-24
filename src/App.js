import React, { useEffect, useRef, useState } from "react";

const BACKEND_URL = "https://backend-winkly.onrender.com";

export default function App() {
  const localVideoRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [coins, setCoins] = useState(5);
  const [gender, setGender] = useState("any");
  const [country, setCountry] = useState("any");
  const [isVIP, setIsVIP] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    });
  }, []);

  const handleConnect = async () => {
    if (!isVIP && (gender !== "any" || country !== "any")) {
      alert("This filter is VIP only. Upgrade to unlock!");
      return;
    }

    if (coins <= 0) {
      alert("Out of coins! Please buy more.");
      return;
    }

    const res = await fetch(`${BACKEND_URL}/match`);
    const data = await res.json();
    if (data?.matched) {
      setConnected(true);
      setCoins((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    setConnected(false);
  };

  const handleBuyVIP = () => {
    alert("Redirecting to Stripe (mock)...");
    setIsVIP(true);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>Winkly 🚀</h1>

      <video ref={localVideoRef} autoPlay muted style={styles.video} />

      <div style={styles.filters}>
        <select value={gender} onChange={(e) => setGender(e.target.value)} disabled={!isVIP}>
          <option value="any">Any Gender</option>
          <option value="boy">Boy</option>
          <option value="girl">Girl</option>
        </select>
        <select value={country} onChange={(e) => setCountry(e.target.value)} disabled={!isVIP}>
          <option value="any">Any Country</option>
          <option value="us">🇺🇸 USA</option>
          <option value="in">🇮🇳 India</option>
          <option value="br">🇧🇷 Brazil</option>
        </select>
        {!isVIP && <button onClick={handleBuyVIP}>🔓 Unlock Filters</button>}
      </div>

      <div style={styles.controls}>
        <button onClick={handleConnect} style={styles.button}>🔄 Connect</button>
        <button onClick={handleSkip} style={styles.button}>⏭️ Skip</button>
      </div>

      <p style={styles.coins}>💰 Coins: {coins} {isVIP && " 👑 VIP"}</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    background: "#000",
    height: "100vh",
    color: "#fff",
    padding: "20px",
  },
  logo: {
    fontSize: "2rem",
  },
  video: {
    width: "60%",
    maxHeight: "60vh",
    borderRadius: "20px",
    marginTop: "20px",
  },
  filters: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    alignItems: "center",
  },
  controls: {
    marginTop: "20px",
  },
  button: {
    margin: "10px",
    padding: "12px 24px",
    fontSize: "1rem",
    borderRadius: "10px",
    backgroundColor: "#222",
    color: "#fff",
    border: "1px solid #444",
    cursor: "pointer",
  },
  coins: {
    marginTop: "20px",
    fontSize: "1.1rem",
  },
};
