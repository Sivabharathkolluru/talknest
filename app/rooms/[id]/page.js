"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("talknest-user");
    if (!saved) {
      router.replace("/");
      return;
    }

    setUser(JSON.parse(saved));

    fetch("/api/rooms")
      .then((response) => response.json())
      .then((data) => setRooms(data.rooms || []))
      .catch(() => setRooms([]));
  }, [router]);

  const visibleRooms = useMemo(() => {
    const queryValue = query.trim().toLowerCase();
    if (!queryValue) return rooms;
    return rooms.filter((room) => {
      return (
        room.name.toLowerCase().includes(queryValue) ||
        room.topic.toLowerCase().includes(queryValue) ||
        room.language.toLowerCase().includes(queryValue) ||
        room.city.toLowerCase().includes(queryValue) ||
        room.state.toLowerCase().includes(queryValue)
      );
    });
  }, [rooms, query]);

  if (!user) {
    return <div className="container" style={{ paddingTop: 80 }}>Loading your dashboard…</div>;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container nav">
          <div className="brand">
            <span className="brand-mark">T</span>
            <span>TalkNest</span>
          </div>

          <div className="searchbar" style={{ minWidth: 240 }}>
            <span>🔎</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search rooms or topics" />
          </div>

          <div className="nav-actions">
            <button className="ghost-btn">Create Room</button>
            <Link href="/admin">
              <button className="ghost-btn">Admin</button>
            </Link>
            <Link href="/dashboard">
              <button className="primary-btn">{user.nickname}</button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container layout-grid">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h4>Discover</h4>
            <div className="menu-list">
              <div className="menu-item active">🏠 Home</div>
              <div className="menu-item">🔎 Discover</div>
              <div className="menu-item">✏️ Create</div>
              <div className="menu-item">🔔 Notifications</div>
              <div className="menu-item">👤 Profile</div>
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Popular</h4>
            <div className="menu-list">
              <div className="menu-item">🎵 Music</div>
              <div className="menu-item">👨‍💻 Tech</div>
              <div className="menu-item">⚽ Sports</div>
              <div className="menu-item">📚 Study</div>
            </div>
          </div>
        </aside>

        <main className="main-panel">
          <div className="hero-panel">
            <span className="pill live">Live now</span>
            <h2>Welcome back, {user.nickname}</h2>
            <p className="subtle">You are in {user.language || "English"}. {user.city ? `Nearby: ${user.city}` : "Set your city to discover local rooms."}</p>
            <div className="hero-actions" style={{ marginTop: 18 }}>
              <button className="primary-btn" onClick={() => router.push("/dashboard#rooms")}>Browse rooms</button>
              <button className="secondary-btn">Create a room</button>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat">
              <span className="subtle">Active rooms</span>
              <strong>{rooms.length}</strong>
            </div>
            <div className="stat">
              <span className="subtle">Listeners</span>
              <strong>{rooms.reduce((count, room) => count + room.participants.length, 0)}</strong>
            </div>
            <div className="stat">
              <span className="subtle">Speakers</span>
              <strong>{rooms.reduce((count, room) => count + room.participants.filter((entry) => entry.isSpeaker).length, 0)}</strong>
            </div>
          </div>

          <div className="section-header" id="rooms">
            <h2>Live rooms</h2>
            <span>{visibleRooms.length} matches</span>
          </div>

          <div className="room-list">
            {visibleRooms.length === 0 ? (
              <div className="topic-card">No rooms match your search right now. Try a broader keyword.</div>
            ) : (
              visibleRooms.map((room) => {
                const listenerCount = room.participants.filter((entry) => !entry.isSpeaker).length;
                const speakerCount = room.participants.filter((entry) => entry.isSpeaker).length;

                return (
                  <div className="room-row" key={room.id}>
                    <div>
                      <strong>{room.name}</strong>
                      <span className="subtle">{room.topic}</span>
                    </div>
                    <div>
                      <span className="subtle">Host</span>
                      <strong>{room.host?.nickname || room.participants[0]?.nickname}</strong>
                    </div>
                    <div>
                      <span className="subtle">Listeners</span>
                      <strong>{listenerCount}</strong>
                    </div>
                    <div>
                      <span className="subtle">Speakers</span>
                      <strong>{speakerCount}</strong>
                    </div>
                    <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                      <span className="pill live">{room.language}</span>
                      <Link href={`/rooms/${room.id}`}>
                        <button className="primary-btn">Join Room</button>
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>

        <aside className="right-panel">
          <div className="sidebar-section">
            <h4>Nearby</h4>
            <div className="profile-card">
              <strong>Hyderabad</strong>
              <p className="subtle">Telangana • India</p>
              <button className="chip-btn">Local discovery on</button>
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Popular topics</h4>
            <div className="menu-list">
              <div className="menu-item">🎵 Music & Songs</div>
              <div className="menu-item">👨‍💻 Technology</div>
              <div className="menu-item">📚 Study Together</div>
              <div className="menu-item">💼 Careers</div>
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Profile</h4>
            <div className="profile-card">
              <div className="avatar-circle" style={{ width: 42, height: 42 }}>{user.nickname.slice(0, 2).toUpperCase()}</div>
              <h3>{user.nickname}</h3>
              <p className="subtle">{user.language} • {user.city || "India"}</p>
              <div className="user-badge">User ID: {user.id}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
