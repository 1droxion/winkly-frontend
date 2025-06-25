import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [logs, setLogs] = useState([]);
  const [vipCount, setVipCount] = useState(0);
  const [coinTotal, setCoinTotal] = useState(0);

  useEffect(() => {
    fetch("https://droxion-backend.onrender.com/admin-logs")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.logs || []);
        setVipCount(data.vip || 0);
        setCoinTotal(data.totalCoins || 0);
      });
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>📊 Winkly Admin Dashboard</h1>
      <div className="admin-summary">
        <div>👑 VIP Users: <b>{vipCount}</b></div>
        <div>💰 Total Coins: <b>{coinTotal}</b></div>
        <div>📈 Logs: <b>{logs.length}</b></div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>IP</th>
            <th>Type</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {logs.slice().reverse().map((log, i) => (
            <tr key={i}>
              <td>{log.time}</td>
              <td>{log.ip}</td>
              <td>{log.type}</td>
              <td>{log.location || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
