"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { io } from "socket.io-client";

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params?.id;
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("talknest-user");
    if (!saved) {
      router.replace("/");
      return;
    }

    const currentUser = JSON.parse(saved);
    setUser(currentUser);

    fetch(`/api/rooms/${roomId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.room) setRoom(data.room);
      });

    fetch(`/api/rooms/${roomId}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: currentUser }),
    }).then((response) => response.json()).then((data) => {
      if (data.room) setRoom(data.room);
    });

    const connection = io();
    connection.on("room-update", ({ room: nextRoom }) => setRoom(nextRoom));
    connection.on("room-message", (message) => {
      setRoom((current) => {
        if (!current) return current;
        return { ...current, messages: [...current.messages, message] };
      });
    });
    setSocket(connection);

    return () => connection.disconnect();
  }, [roomId, router]);

  const speakers = useMemo(() => room?.participants.filter((entry) => entry.isSpeaker) || [], [room]);
  const listeners = useMemo(() => room?.participants.filter((entry) => !entry.isSpeaker) || [], [room]);

  const handleRequestSpeak = async () => {
    if (!user) return;
    const response = await fetch(`/api/rooms/${roomId}/request-speak`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    });
    const data = await response.json();
    if (data.room) {
      setRoom(data.room);
      socket?.emit("request-speak", { roomId, userId: user.id });
    }
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || !user) return;

    const payload = {
      roomId,
      user,
      message: chatInput.trim(),
    };

    socket?.emit("send-message", payload);
    setChatInput("");
  };

  const handleReport = async () => {
    if (!user) return;
    const response = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reportedUser: user.nickname,
        roomId,
        category: "Harassment",
        description: "User reported from room.",
      }),
    });
    const data = await response.json();
    if (data.report) {
      alert("Your report has been received.");
    }
  };

  if (!room) {
    return <div className="container" style={{ paddingTop: 80 }}>Loading room…</div>;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container nav">
          <div className="brand">
            <span className="brand-mark">T</span>
            <span>TalkNest</span>
          </div>

          <div className="nav-actions">
            <Link href="/dashboard">
              <button className="ghost-btn">Back to rooms</button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container room-page">
        <div className="room-header">
          <div>
            <span className="pill live">{room.status}</span>
            <h1 style={{ margin: "12px 0 6px" }}>{room.name}</h1>
            <div className="subtle">{room.topic} • {room.language} • {room.participants.length} participants</div>
          </div>
          <div className="user-badge">Host: {room.host?.nickname || room.participants[0]?.nickname}</div>
        </div>

        <div className="room-layout">
          <div>
            <div className="chat-box">
              <div className="section-header" style={{ marginBottom: 14 }}>
                <h2>🎙️ Speakers</h2>
                <span>{speakers.length} active</span>
              </div>

              <div className="speaker-grid">
                {speakers.map((participant) => (
                  <div className="avatar-card" key={participant.id}>
                    <div className="avatar-circle">{participant.avatar}</div>
                    <strong>{participant.nickname}</strong>
                    <div className="speaking-wave" style={{ marginTop: 8 }} />
                    <div className="subtle">Mic on</div>
                  </div>
                ))}
              </div>

              <div className="section-header" style={{ marginTop: 24, marginBottom: 12 }}>
                <h2>👥 Listeners</h2>
                <span>{listeners.length} listeners</span>
              </div>

              <div className="speaker-grid">
                {listeners.map((participant) => (
                  <div className="avatar-card" key={participant.id}>
                    <div className="avatar-circle">{participant.avatar}</div>
                    <strong>{participant.nickname}</strong>
                    <div className="subtle">Listening</div>
                  </div>
                ))}
              </div>

              <div className="room-controls">
                <button className="primary-btn" onClick={handleRequestSpeak}>Request to Speak</button>
                <button className="secondary-btn" onClick={() => alert("Muted for this room")}>Mute</button>
                <button className="ghost-btn" onClick={handleReport}>Report</button>
                <button className="ghost-btn" onClick={() => router.push("/dashboard")}>Leave</button>
              </div>
            </div>
          </div>

          <aside className="chat-box">
            <div className="section-header" style={{ marginBottom: 10 }}>
              <h2>Text chat</h2>
              <span>{room.messages?.length || 0}</span>
            </div>

            <div className="chat-list">
              {(room.messages || []).map((message) => (
                <div key={message.id} className="chat-message">
                  <strong>{message.nickname}</strong>
                  <div>{message.text}</div>
                </div>
              ))}
            </div>

            <div className="chat-form">
              <input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Send a message" />
              <button className="primary-btn" onClick={handleSendChat}>Send</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
