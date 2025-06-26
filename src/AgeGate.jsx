import React, { useEffect, useState } from "react";

export default function AgeGate() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const agreed = localStorage.getItem("age_verified");
    if (agreed === "true") setAccepted(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("age_verified", "true");
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.95)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
    }}>
      <h2 style={{ fontSize: "2rem" }}>🔞 18+ Only</h2>
      <p style={{ maxWidth: 400, textAlign: "center", margin: "1rem 0" }}>
        Winkly is an adult-friendly video chat platform. You must be 18 years or older to enter.
      </p>
      <button onClick={handleAccept} style={{
        background: "#ffcc70",
        color: "#000",
        padding: "12px 24px",
        fontSize: "1rem",
        border: "none",
        borderRadius: 8,
        cursor: "pointer"
      }}>
        ✅ I’m 18+ and Agree
      </button>
    </div>
  );
}
