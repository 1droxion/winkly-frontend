import React from "react";
import "./UpgradePage.css";

export default function UpgradePage() {
  return (
    <div className="upgrade-page">
      <h1 className="upgrade-title">💫 Upgrade to Unlock Full Power</h1>
      <p className="upgrade-subtitle">Get more coins, skip limits, and VIP features</p>

      <div className="plans-container">
        <div className="plan-card free">
          <h2>🆓 Starter</h2>
          <p>Free forever</p>
          <ul>
            <li>🎥 Random connect</li>
            <li>⏭️ Limited skip</li>
            <li>🛑 No filters</li>
          </ul>
        </div>

        <div className="plan-card">
          <h2>💼 Starter Pack</h2>
          <p>$1.99</p>
          <ul>
            <li>💰 5 Coins</li>
            <li>⚡ Instant connect</li>
          </ul>
          <a href="https://buy.stripe.com/14AaEX0vr3NidTX0SS97G03" target="_blank" rel="noreferrer">
            <button>Buy Now</button>
          </a>
        </div>

        <div className="plan-card">
          <h2>🚀 Pro Pack</h2>
          <p>$5.00</p>
          <ul>
            <li>💰 20 Coins</li>
            <li>🚀 Faster match</li>
          </ul>
          <a href="https://buy.stripe.com/aFa7sL91X83y17bfNM97G04" target="_blank" rel="noreferrer">
            <button>Buy Now</button>
          </a>
        </div>

        <div className="plan-card">
          <h2>🔥 Power Pack</h2>
          <p>$9.99</p>
          <ul>
            <li>💰 50 Coins</li>
            <li>🚀 Priority connect</li>
          </ul>
          <a href="https://buy.stripe.com/14AfZh0vrbfK3fj8lk97G05" target="_blank" rel="noreferrer">
            <button>Buy Now</button>
          </a>
        </div>

        <div className="plan-card vip">
          <h2>👑 VIP Access</h2>
          <p>$19.99</p>
          <ul>
            <li>🔓 Unlock Gender Filter</li>
            <li>🌎 Country Filter</li>
            <li>⏭️ Unlimited Skips</li>
            <li>⚡ Fastest Matching</li>
          </ul>
          <a href="https://buy.stripe.com/dRm3cvemh4Rm9DH9po97G06" target="_blank" rel="noreferrer">
            <button className="vip-button">Unlock VIP</button>
          </a>
        </div>
      </div>

      <a href="/" className="back-home">⬅ Back to Winkly</a>
    </div>
  );
}
