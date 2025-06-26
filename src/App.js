import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cameraAllowed, setCameraAllowed] = useState(null);
  const [coins, setCoins] = useState(1);
  const [gender, setGender] = useState("any");
  const [country, setCountry] = useState("any");

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => setCameraAllowed(true))
      .catch(() => setCameraAllowed(false));
  }, []);

  return (
    <div className="winkly">
      <div className="topbar">
        <button onClick={() => window.location.href = "/"} title="Home">🏠</button>
        <button onClick={() => window.location.href = "/discover"} title="Discover">🎉</button>
        <button onClick={() => window.location.href = "/plans"} title="Plans">💎</button>
        <button onClick={() => window.location.href = "/profile"} title="Profile">🧑‍💼</button>
        <button onClick={() => window.location.href = "/admin"} title="Admin">📊</button>
      </div>

      <h1>Winkly ★</h1>
      <p>💰 Coins: {coins}</p>

      <div className="video-box">
        {cameraAllowed === false ? (
          <p className="error">🚫 Camera access denied</p>
        ) : (
          <video autoPlay muted playsInline className="preview"></video>
        )}
      </div>

      <div className="selectors">
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="any">Any Gender</option>
          <option value="boy">Boy</option>
          <option value="girl">Girl</option>
        </select>

        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="any">Any Country</option>
          <option value="us">🇺🇸 USA</option>
          <option value="in">🇮🇳 India</option>
          <option value="br">🇧🇷 Brazil</option>
          <option value="ru">🇷🇺 Russia</option>
          <option value="mx">🇲🇽 Mexico</option>
        </select>
      </div>

      <div className="actions">
        <button className="connect">🔗 Connect</button>
        <button className="skip">⏭️ Skip</button>
      </div>
    </div>
  );
}

export default App;
