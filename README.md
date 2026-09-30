"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalUsers: 1420,
    activeUsers: 118,
    activeRooms: 9,
    activeSpeakers: 32,
    reportsToday: 7,
    bannedUsers: 24,
  });

  useEffect(() => {
    fetch("/api/rooms")
      .then((response) => response.json())
      .then((data) => {
        if (data.rooms) {
          setStats((current) => ({ ...current, activeRooms: data.rooms.length }));
        }
      });
  }, []);

  const reports = [
    { id: "R-104", user: "Ava", action: "Pending", reason: "Harassment", admin: "N/A", timestamp: "2 min ago" },
    { id: "R-201", user: "Karan", action: "Investigating", reason: "Spam", admin: "Maya", timestamp: "24 min ago" },
    { id: "R-318", user: "Riya", action: "Resolved", reason: "Threats", admin: "Aman", timestamp: "1 hr ago" },
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container nav">
          <div className="brand">
            <span className="brand-mark">T</span>
            <span>TalkNest Admin</span>
          </div>
          <div className="nav-actions">
            <button className="ghost-btn">Search user</button>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: "30px 0 60px" }}>
        <div className="section-header">
          <h2>Admin dashboard</h2>
          <span>Protected moderation workspace</span>
        </div>

        <div className="stats-grid" style={{ marginBottom: 24 }}>
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="stat">
              <span className="subtle">{key.replace(/([A-Z])/g, " $1").replace(/^./, (match) => match.toUpperCase())}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <div className="card-grid">
          <div className="admin-card">
            <h3>User management</h3>
            <p className="subtle">Search user, view profile, suspend or ban users.</p>
            <button className="secondary-btn">Manage users</button>
          </div>
          <div className="admin-card">
            <h3>Room management</h3>
            <p className="subtle">View active rooms and close unsafe rooms.</p>
            <button className="secondary-btn">Manage rooms</button>
          </div>
          <div className="admin-card">
            <h3>Reports</h3>
            <p className="subtle">Resolve or reject pending reports quickly.</p>
            <button className="secondary-btn">Review reports</button>
          </div>
        </div>

        <div className="section-header" style={{ marginTop: 28 }}>
          <h2>Moderation queue</h2>
          <span>Pending investigations</span>
        </div>

        <div className="room-list">
          {reports.map((report) => (
            <div className="room-row" key={report.id}>
              <div>
                <strong>{report.user}</strong>
                <span className="subtle">{report.id}</span>
              </div>
              <div>
                <span className="subtle">Action</span>
                <strong>{report.action}</strong>
              </div>
              <div>
                <span className="subtle">Reason</span>
                <strong>{report.reason}</strong>
              </div>
              <div>
                <span className="subtle">Admin</span>
                <strong>{report.admin}</strong>
              </div>
              <div>
                <span className="subtle">Timestamp</span>
                <strong>{report.timestamp}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
