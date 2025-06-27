// src/Room.jsx
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import fakeUsers from "./fakeUsers";

function Room() {
  const [search] = useSearchParams();
  const gender = search.get("gender") || "any";
  const country = search.get("country") || "any";
  const [match, setMatch] = useState(null);
  const videoRef = useRef();
  const [cameraAllowed, setCameraAllowed] = useState(null);

  useEffect(() => {
    // Start camera
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        setCameraAllowed(true);
      })
      .catch(() => setCameraAllowed(false));

    // Find fake match
    const filtered = fakeUsers.filter(u => {
      const genderMatch = gender === "any" || u.gender === gender;
      const countryMatch = country === "any" || u.country === country;
      return genderMatch && countryMatch;
    });

    if (filtered.length > 0) {
      const random = filtered[Math.floor(Math.random() * filtered.length)];
      setMatch(random);
    } else {
      setMatch({ name: "Unknown", country: "any", photo: "https://i.imgur.com/7fFXSgv.jpg" });
    }
  }, [gender, country]);

  return (
    <div style={{ padding: 20, textAlign: "center", background: "#111", color: "#fff", height: "100vh" }}>
      <h2 style={{ color: "#ffcc70", marginBottom: "20px" }}>🎥 Connected to:</h2>

      {match && (
        <div style={{ marginBottom: 20 }}>
          <img src={match.photo} alt={match.name} style={{ width: 140, height: 140, borderRadius: "50%", objectFit: "cover" }} />
          <h3>{match.name}</h3>
          <p>{match.country.toUpperCase()}</p>
        </div>
      )}

      {cameraAllowed === false ? (
        <p className="error">🚫 Camera access denied.</p>
      ) : (
        <video ref={videoRef} autoPlay muted playsInline style={{ width: "100%", maxWidth: 480, borderRadius: 16, background: "#000" }} />
      )}

      <div style={{ marginTop: 30, color: "#aaa", fontSize: "0.9rem" }}>
        <p>This is a fake demo match. Real video calling logic can be integrated next.</p>
      </div>
    </div>
  );
}

export default Room;
