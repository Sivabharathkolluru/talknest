"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const topics = [
  { emoji: "🎵", title: "Music & Songs", tag: "Live" },
  { emoji: "👨‍💻", title: "Technology", tag: "New" },
  { emoji: "🎬", title: "Movies", tag: "Hot" },
  { emoji: "⚽", title: "Sports", tag: "Buzz" },
  { emoji: "💬", title: "Random Talk", tag: "Open" },
  { emoji: "🇮🇳", title: "India Chat", tag: "Popular" },
  { emoji: "📚", title: "Study Together", tag: "Focus" },
  { emoji: "💼", title: "Careers", tag: "Jobs" },
  { emoji: "😂", title: "Fun & Memes", tag: "Funny" },
  { emoji: "❤️", title: "Relationships", tag: "Support" },
];

const languages = ["English", "Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", "Bengali", "Marathi", "Other"];

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    nickname: "",
    language: "English",
    state: "",
    city: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("talknest-user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const createSession = async (event) => {
    event.preventDefault();
    if (!form.nickname.trim() || form.nickname.trim().length < 2) {
      return;
    }

    setSubmitting(true);
    const response = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname: form.nickname.trim(),
        language: form.language,
        state: form.state,
        city: form.city,
      }),
    });

    const data = await response.json();
    setSubmitting(false);

    if (!response.ok) {
      alert(data.error || "Unable to continue.");
      return;
    }

    localStorage.setItem("talknest-user", JSON.stringify(data.user));
    setUser(data.user);
    setShowOnboarding(false);
    window.location.href = "/dashboard";
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container nav">
          <div className="brand">
            <span className="brand-mark">T</span>
            <span>TalkNest</span>
          </div>

          <nav className="nav-links">
            <Link href="#how-it-works">How it works</Link>
            <Link href="#rooms">Live rooms</Link>
            <Link href="#topics">Topics</Link>
            <Link href="#safety">Safety</Link>
          </nav>

          <div className="nav-actions">
            {user ? (
              <Link href="/dashboard">
                <button className="secondary-btn" type="button">Go to app</button>
              </Link>
            ) : (
              <>
                <button className="ghost-btn" type="button" onClick={() => setShowOnboarding(true)}>Start talking</button>
                <button className="primary-btn" type="button" onClick={() => setShowOnboarding(true)}>Explore rooms</button>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <div className="user-badge">Anonymous • India-first • 18+ only</div>
              <h1>Talk to people. One room at a time.</h1>
              <p>
                Join live conversations with people across India — anonymously, casually and without complicated signups.
              </p>

              <div className="hero-actions">
                <button className="primary-btn" type="button" onClick={() => setShowOnboarding(true)}>Start Talking</button>
                <button className="secondary-btn" type="button" onClick={() => setShowOnboarding(true)}>Explore Rooms</button>
              </div>
            </div>

            <div className="hero-visual">
              <div className="room-grid">
                {topics.slice(0, 5).map((topic) => (
                  <div className="room-mini" key={topic.title}>
                    <div className="room-mini-head">
                      <strong>{topic.emoji} {topic.title}</strong>
                      <span className="pill live">Live</span>
                    </div>
                    <div className="metric-row">
                      <span>👥 22 listening</span>
                      <span>🎙️ 4 speaking</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="how-it-works">
          <div className="container">
            <div className="section-header">
              <h2>How it works</h2>
              <span>Fast, simple and anonymous</span>
            </div>

            <div className="card-grid">
              {[
                { step: "1", title: "Pick a nickname", body: "Create an anonymous profile in seconds." },
                { step: "2", title: "Choose a room", body: "Find topics, languages and local communities." },
                { step: "3", title: "Join and listen", body: "Drop in instantly and discover the vibe." },
                { step: "4", title: "Speak when ready", body: "Request mic access without friction." },
              ].map((item) => (
                <div key={item.step} className="topic-card">
                  <div className="user-badge">Step {item.step}</div>
                  <h3>{item.title}</h3>
                  <p className="subtle">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="rooms">
          <div className="container">
            <div className="section-header">
              <h2>Live rooms</h2>
              <span>See what’s happening right now</span>
            </div>

            <div className="card-grid">
              {[
                { name: "Late Night Conversations", host: "Rahul", listeners: 24, speakers: 5, language: "English" },
                { name: "Hyderabad Techies", host: "Neha", listeners: 18, speakers: 4, language: "English" },
                { name: "Telugu Friends Chat", host: "Priya", listeners: 33, speakers: 6, language: "Telugu" },
                { name: "Cricket Fans India", host: "Vikram", listeners: 29, speakers: 3, language: "Hindi" },
              ].map((room) => (
                <div key={room.name} className="room-card">
                  <div className="room-card-meta">
                    <span className="pill live">Live</span>
                    <span>{room.language}</span>
                  </div>
                  <div>
                    <strong>{room.name}</strong>
                    <p className="subtle">Host: {room.host}</p>
                  </div>
                  <div className="metric-row">
                    <span>👥 {room.listeners} listening</span>
                    <span>🎙️ {room.speakers} speaking</span>
                  </div>
                  <div className="room-card-bottom">
                    <span>{room.language}</span>
                    <button className="primary-btn" type="button" onClick={() => setShowOnboarding(true)}>Join room</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="topics">
          <div className="container">
            <div className="section-header">
              <h2>Popular topics</h2>
              <span>Find your vibe</span>
            </div>

            <div className="card-grid">
              {topics.map((topic) => (
                <div key={topic.title} className="topic-card">
                  <div className="topic-icon">{topic.emoji}</div>
                  <h3>{topic.title}</h3>
                  <span className="pill muted">{topic.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="safety">
          <div className="container">
            <div className="section-header">
              <h2>Safety first</h2>
              <span>Privacy by design</span>
            </div>

            <div className="card-grid">
              {[
                "Report, block and mute in one tap",
                "Moderation tools for harmful behavior",
                "Anonymous sessions with no email required",
                "Clear safety guidance in every room",
              ].map((item) => (
                <div key={item} className="language-card">
                  <span className="pill muted">Safe</span>
                  <h3>{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="brand">
              <span className="brand-mark">T</span>
              <span>TalkNest</span>
            </div>
            <p className="subtle">Talk freely. Meet naturally.</p>
          </div>
          <div>
            <h4>Platform</h4>
            <p>Live rooms</p>
            <p>Topics</p>
            <p>Safety center</p>
          </div>
          <div>
            <h4>Community</h4>
            <p>India chat</p>
            <p>Study groups</p>
            <p>Creator rooms</p>
          </div>
          <div>
            <h4>Resources</h4>
            <p>FAQ</p>
            <p>Privacy</p>
            <p>Support</p>
          </div>
        </div>
      </footer>

      {showOnboarding && (
        <div className="modal-backdrop" onClick={() => setShowOnboarding(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <div className="section-header" style={{ marginBottom: 18 }}>
              <h2>Pick your profile</h2>
              <button className="ghost-btn" type="button" onClick={() => setShowOnboarding(false)}>Close</button>
            </div>

            <form className="onboarding-form" onSubmit={createSession}>
              <div className="field">
                <label htmlFor="nickname">Nickname</label>
                <input id="nickname" name="nickname" value={form.nickname} onChange={handleChange} placeholder="Choose a nickname" required minLength={2} maxLength={20} />
              </div>

              <div className="field">
                <label htmlFor="language">Language</label>
                <select id="language" name="language" value={form.language} onChange={handleChange}>
                  {languages.map((language) => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="state">State (optional)</label>
                  <input id="state" name="state" value={form.state} onChange={handleChange} placeholder="Telangana" />
                </div>
                <div className="field">
                  <label htmlFor="city">City (optional)</label>
                  <input id="city" name="city" value={form.city} onChange={handleChange} placeholder="Hyderabad" />
                </div>
              </div>

              <div className="user-badge">Anonymous ID: TN-{Math.random().toString(36).slice(2, 8).toUpperCase()}</div>

              <button className="primary-btn" type="submit" disabled={submitting}>
                {submitting ? "Creating session..." : "Continue anonymously"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
