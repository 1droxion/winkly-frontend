// src/UpgradePage.jsx
import React from "react";

const plans = [
  {
    name: "Starter",
    price: "Free forever",
    features: ["🧑‍🤝‍🧑 Random connect", "⏩ Limited skip", "❌ No filters"],
    button: null,
    emoji: "🆓"
  },
  {
    name: "Starter Pack",
    price: "$1.99",
    features: ["💰 5 Coins", "⚡ Instant connect"],
    button: "https://buy.stripe.com/14AaEX0vr3NidTX0SS97G03",
    emoji: "💼"
  },
  {
    name: "Pro Pack",
    price: "$5.00",
    features: ["💰 20 Coins", "🚀 Faster match"],
    button: "https://buy.stripe.com/aFa7sL91X83y17bfNM97G04",
    emoji: "🚀"
  },
  {
    name: "Power Pack",
    price: "$9.99",
    features: ["💰 50 Coins", "💨 Priority match"],
    button: "https://buy.stripe.com/14AfZh0vrbfK3fj8lk97G05",
    emoji: "🔥"
  },
  {
    name: "VIP Access",
    price: "$19.99",
    features: ["🎭 Unlock all filters", "♾️ Unlimited skip", "💎 VIP Badge"],
    button: "https://buy.stripe.com/dRm3cvemh4Rm9DH9po97G06",
    emoji: "👑"
  }
];

function UpgradePage() {
  return (
    <div className="main-panel">
      <h1 style={{ textAlign: "center", color: "#ffcc70", marginBottom: "0.5rem" }}>
        Upgrade to Unlock Full Power
      </h1>
      <p style={{ textAlign: "center", marginBottom: "2rem", fontSize: "1rem", color: "#ddd" }}>
        Get more coins, skip limits, and VIP features
      </p>

      <div className="plans-container">
        {plans.map((plan, i) => (
          <div className="plan-card" key={i}>
            <h3>{plan.emoji} <strong>{plan.name}</strong></h3>
            <h4 style={{ color: "#ffcc70" }}>{plan.price}</h4>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 10 }}>
              {plan.features.map((f, idx) => (
                <li key={idx} style={{ marginBottom: 6 }}>{f}</li>
              ))}
            </ul>
            {plan.button && (
              <a href={plan.button} target="_blank" rel="noopener noreferrer">
                <button>Buy Now</button>
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="legal" style={{ marginTop: 50 }}>
        <p><strong>All purchases are final.</strong> Coins and VIP cannot be refunded.</p>
      </div>
    </div>
  );
}

export default UpgradePage;
