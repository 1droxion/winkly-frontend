// src/Discover.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const fakeUsers = [
  { name: "Sofia", country: "us", photo: "https://i.imgur.com/7fFXSgv.jpg", gender: "girl" },
  { name: "Aanya", country: "in", photo: "https://i.imgur.com/HGz5Z5A.jpg", gender: "girl" },
  { name: "Luna", country: "br", photo: "https://i.imgur.com/ZkmFlj7.jpg", gender: "girl" },
  { name: "Natasha", country: "ru", photo: "https://i.imgur.com/zURaKX9.jpg", gender: "girl" },
  { name: "Camila", country: "mx", photo: "https://i.imgur.com/I3aZcMg.jpg", gender: "girl" },
];

function Discover({ gender, country }) {
  const [online, setOnline] = useState([]);

  useEffect(() => {
    // In real version, call your backend to fetch online users
    axios.get("https://winkly-backend.onrender.com/online-users")
      .then(res => {
        let filtered = res.data.users || [];

        // Apply gender filter
        if (gender !== "any") {
          filtered = filtered.filter(u => u.gender === gender);
        }

        // Apply country filter
        if (country !== "any") {
          filtered = filtered.filter(u => u.country === country);
        }

        // If empty, show fallback
        if (filtered.length === 0) {
          filtered = fakeUsers.filter(u => {
            const genderMatch = gender === "any" || u.gender === gender;
            const countryMatch = country === "any" || u.country === country;
            return genderMatch && countryMatch;
          });
        }

        setOnline(filtered);
      })
      .catch(() => {
        // fallback to fake users if API fails
        const fallback = fakeUsers.filter(u => {
          const genderMatch = gender === "any" || u.gender === gender;
          const countryMatch = country === "any" || u.country === country;
          return genderMatch && countryMatch;
        });
        setOnline(fallback);
      });
  }, [gender, country]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: "#ffcc70", marginBottom: 20 }}>🟢 Online Girls</h1>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px"
      }}>
        {online.map((user, i) => (
          <div key={i} style={{
            background: "#1a1a1a",
            borderRadius: "16px",
            padding: "12px",
            width: "160px",
            textAlign: "center",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)"
          }}>
            <img src={user.photo} alt={user.name} style={{ width: "100%", borderRadius: "12px" }} />
            <h3 style={{ margin: "10px 0 4px", fontSize: "1rem", color: "#fff" }}>{user.name}</h3>
            <p style={{ color: "#bbb", fontSize: "0.9rem" }}>{user.country.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Discover;
