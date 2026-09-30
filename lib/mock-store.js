const { randomUUID } = await import("node:crypto");

export const rooms = [
  {
    id: "room-telugu-friends",
    name: "Telugu Friends Chat",
    topic: "Music & Songs",
    language: "Telugu",
    host: { id: "host-1", nickname: "Rahul", city: "Hyderabad", state: "Telangana" },
    description: "Casual chats, new songs, and weekend plans.",
    maxParticipants: 30,
    privacy: "public",
    city: "Hyderabad",
    state: "Telangana",
    status: "live",
    participants: [
      { id: "host-1", nickname: "Rahul", avatar: "R", language: "Telugu", city: "Hyderabad", state: "Telangana", isSpeaker: true, muted: false },
      { id: "user-2", nickname: "Priya", avatar: "P", language: "Telugu", city: "Vijayawada", state: "Andhra Pradesh", isSpeaker: true, muted: false },
      { id: "user-3", nickname: "Arjun", avatar: "A", language: "Telugu", city: "Guntur", state: "Andhra Pradesh", isSpeaker: false, muted: false },
      { id: "user-4", nickname: "Meghana", avatar: "M", language: "Telugu", city: "Hyderabad", state: "Telangana", isSpeaker: false, muted: false },
      { id: "user-5", nickname: "Naveen", avatar: "N", language: "Hindi", city: "Delhi", state: "Delhi", isSpeaker: false, muted: false },
    ],
    messages: [
      { id: "msg-1", userId: "host-1", nickname: "Rahul", text: "Morning jam session is live!", createdAt: new Date().toISOString() },
      { id: "msg-2", userId: "user-2", nickname: "Priya", text: "I love this playlist!", createdAt: new Date().toISOString() },
    ],
    speakerRequests: [],
    roomCode: null,
  },
  {
    id: "room-late-night",
    name: "Late Night Talks",
    topic: "Random Talk",
    language: "English",
    host: { id: "host-2", nickname: "Aisha", city: "Bengaluru", state: "Karnataka" },
    description: "Slow, open, and honest conversations late into the night.",
    maxParticipants: 50,
    privacy: "public",
    city: "Bengaluru",
    state: "Karnataka",
    status: "live",
    participants: [
      { id: "host-2", nickname: "Aisha", avatar: "A", language: "English", city: "Bengaluru", state: "Karnataka", isSpeaker: true, muted: false },
      { id: "user-6", nickname: "Karan", avatar: "K", language: "Hindi", city: "Pune", state: "Maharashtra", isSpeaker: true, muted: false },
      { id: "user-7", nickname: "Sara", avatar: "S", language: "English", city: "Mumbai", state: "Maharashtra", isSpeaker: false, muted: false },
      { id: "user-8", nickname: "Dev", avatar: "D", language: "English", city: "Bengaluru", state: "Karnataka", isSpeaker: false, muted: false },
    ],
    messages: [
      { id: "msg-3", userId: "host-2", nickname: "Aisha", text: "What are your midnight rituals?", createdAt: new Date().toISOString() },
    ],
    speakerRequests: [],
    roomCode: null,
  },
  {
    id: "room-hyderabad-tech",
    name: "Hyderabad Techies",
    topic: "Technology",
    language: "English",
    host: { id: "host-3", nickname: "Neha", city: "Hyderabad", state: "Telangana" },
    description: "Tech trends, startups, and product discussions.",
    maxParticipants: 40,
    privacy: "public",
    city: "Hyderabad",
    state: "Telangana",
    status: "live",
    participants: [
      { id: "host-3", nickname: "Neha", avatar: "N", language: "English", city: "Hyderabad", state: "Telangana", isSpeaker: true, muted: false },
      { id: "user-9", nickname: "Rohit", avatar: "R", language: "English", city: "Hyderabad", state: "Telangana", isSpeaker: true, muted: false },
      { id: "user-10", nickname: "Shreya", avatar: "S", language: "Hindi", city: "Secunderabad", state: "Telangana", isSpeaker: false, muted: false },
    ],
    messages: [],
    speakerRequests: [],
    roomCode: null,
  },
  {
    id: "room-cricket-fans",
    name: "Cricket Fans India",
    topic: "Sports",
    language: "Hindi",
    host: { id: "host-4", nickname: "Vikram", city: "Lucknow", state: "Uttar Pradesh" },
    description: "Match talk, opinions, and fan banter.",
    maxParticipants: 35,
    privacy: "public",
    city: "Lucknow",
    state: "Uttar Pradesh",
    status: "live",
    participants: [
      { id: "host-4", nickname: "Vikram", avatar: "V", language: "Hindi", city: "Lucknow", state: "Uttar Pradesh", isSpeaker: true, muted: false },
      { id: "user-11", nickname: "Pooja", avatar: "P", language: "Hindi", city: "Delhi", state: "Delhi", isSpeaker: true, muted: false },
      { id: "user-12", nickname: "Akash", avatar: "A", language: "Hindi", city: "Jaipur", state: "Rajasthan", isSpeaker: false, muted: false },
    ],
    messages: [
      { id: "msg-4", userId: "host-4", nickname: "Vikram", text: "India has every chance this season.", createdAt: new Date().toISOString() },
    ],
    speakerRequests: [],
    roomCode: null,
  },
  {
    id: "room-python-beginners",
    name: "Python Beginners",
    topic: "Study Together",
    language: "English",
    host: { id: "host-5", nickname: "Ishita", city: "Pune", state: "Maharashtra" },
    description: "Friendly beginner support for Python learners.",
    maxParticipants: 25,
    privacy: "public",
    city: "Pune",
    state: "Maharashtra",
    status: "live",
    participants: [
      { id: "host-5", nickname: "Ishita", avatar: "I", language: "English", city: "Pune", state: "Maharashtra", isSpeaker: true, muted: false },
      { id: "user-13", nickname: "Yash", avatar: "Y", language: "English", city: "Nagpur", state: "Maharashtra", isSpeaker: false, muted: false },
      { id: "user-14", nickname: "Mira", avatar: "M", language: "Hindi", city: "Bhopal", state: "Madhya Pradesh", isSpeaker: false, muted: false },
    ],
    messages: [],
    speakerRequests: [],
    roomCode: null,
  },
];

export const notifications = [
  { id: "n-1", type: "speaker-request", message: "Someone requested to speak in Late Night Talks." },
  { id: "n-2", type: "follow", message: "Aisha started following you." },
  { id: "n-3", type: "room-activity", message: "Hyderabad Techies is now active." },
];

export const reports = [];

export function createSession({ nickname, language, state, city }) {
  const userId = `TN-${randomUUID().slice(0, 6).toUpperCase()}`;
  return {
    id: userId,
    nickname,
    language,
    state: state || "",
    city: city || "",
    bio: "New to TalkNest. Looking to meet people and join good conversations.",
    avatar: nickname.slice(0, 2).toUpperCase(),
    createdAt: new Date().toISOString(),
  };
}

export function listRooms() {
  return rooms.map((room) => ({
    ...room,
    listenerCount: room.participants.filter((p) => !p.isSpeaker).length,
    speakerCount: room.participants.filter((p) => p.isSpeaker).length,
  }));
}

export function getRoomById(id) {
  return rooms.find((room) => room.id === id) || null;
}

export function createRoom(input) {
  const roomId = `room-${randomUUID().slice(0, 8)}`;
  const room = {
    id: roomId,
    name: input.name,
    topic: input.topic,
    language: input.language,
    description: input.description,
    maxParticipants: Number(input.maxParticipants || 25),
    privacy: input.privacy || "public",
    city: input.city || "",
    state: input.state || "",
    status: "live",
    host: {
      id: input.host.id,
      nickname: input.host.nickname,
      city: input.host.city || input.city || "India",
      state: input.host.state || input.state || "India",
    },
    participants: [
      {
        id: input.host.id,
        nickname: input.host.nickname,
        avatar: input.host.nickname.slice(0, 2).toUpperCase(),
        language: input.language,
        city: input.city || "India",
        state: input.state || "India",
        isSpeaker: true,
        muted: false,
      },
    ],
    messages: [],
    speakerRequests: [],
    roomCode: input.privacy === "private" ? `TN-${Math.floor(1000 + Math.random() * 9000)}` : null,
  };

  rooms.unshift(room);
  return room;
}

export function joinRoom(roomId, user) {
  const room = getRoomById(roomId);
  if (!room) return null;

  const alreadyJoined = room.participants.some((participant) => participant.id === user.id);
  if (!alreadyJoined) {
    room.participants.push({
      id: user.id,
      nickname: user.nickname,
      avatar: user.nickname.slice(0, 2).toUpperCase(),
      language: user.language,
      city: user.city || "India",
      state: user.state || "India",
      isSpeaker: false,
      muted: false,
    });
  }

  return room;
}

export function leaveRoom(roomId, userId) {
  const room = getRoomById(roomId);
  if (!room) return null;

  room.participants = room.participants.filter((participant) => participant.id !== userId);
  room.messages.push({
    id: `msg-${randomUUID().slice(0, 8)}`,
    userId: "system",
    nickname: "System",
    text: `A user left the room.`,
    createdAt: new Date().toISOString(),
  });

  return room;
}

export function requestSpeak(roomId, userId) {
  const room = getRoomById(roomId);
  if (!room) return null;

  if (!room.speakerRequests.includes(userId)) {
    room.speakerRequests.push(userId);
  }

  return room;
}

export function approveSpeaker(roomId, userId) {
  const room = getRoomById(roomId);
  if (!room) return null;

  const participant = room.participants.find((entry) => entry.id === userId);
  if (participant) {
    participant.isSpeaker = true;
    room.speakerRequests = room.speakerRequests.filter((requestId) => requestId !== userId);
  }

  return room;
}

export function reportUser(payload) {
  const record = {
    id: `report-${randomUUID().slice(0, 8)}`,
    ...payload,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  reports.push(record);
  return record;
}

export function blockUser(payload) {
  const record = {
    id: `block-${randomUUID().slice(0, 8)}`,
    ...payload,
    createdAt: new Date().toISOString(),
  };

  return record;
}

export function searchRooms(query) {
  const value = query.trim().toLowerCase();
  if (!value) return listRooms();

  return rooms.filter((room) => {
    return (
      room.name.toLowerCase().includes(value) ||
      room.topic.toLowerCase().includes(value) ||
      room.language.toLowerCase().includes(value) ||
      room.city.toLowerCase().includes(value) ||
      room.state.toLowerCase().includes(value) ||
      room.host.nickname.toLowerCase().includes(value)
    );
  });
}

export function getDashboardStats() {
  return {
    totalUsers: 1420,
    activeUsers: 118,
    activeRooms: rooms.length,
    activeSpeakers: rooms.reduce((count, room) => count + room.participants.filter((p) => p.isSpeaker).length, 0),
    reportsToday: reports.length,
    bannedUsers: 24,
  };
}

export function canAccessRoom(room, user) {
  if (!room || !user) return false;
  if (room.privacy === "public") return true;
  return room.participants.some((participant) => participant.id === user.id);
}
