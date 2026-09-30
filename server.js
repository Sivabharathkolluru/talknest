const { createServer } = await import("node:http");
const next = (await import("next")).default;
const { Server } = await import("socket.io");
const {
  getRoomById,
  joinRoom,
  leaveRoom,
  requestSpeak,
  approveSpeaker,
  listRooms,
} = await import("./lib/mock-store.js");

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = Number(process.env.PORT || 3000);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

await app.prepare();

const server = createServer((req, res) => handle(req, res));
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", ({ roomId, user }) => {
    const room = joinRoom(roomId, user);
    if (!room) return;
    io.to(roomId).emit("room-update", { room });
    socket.join(roomId);
    io.to(roomId).emit("room-update", { room });
  });

  socket.on("request-speak", ({ roomId, userId }) => {
    const room = requestSpeak(roomId, userId);
    if (!room) return;
    io.to(roomId).emit("room-update", { room });
  });

  socket.on("approve-speaker", ({ roomId, userId }) => {
    const room = approveSpeaker(roomId, userId);
    if (!room) return;
    io.to(roomId).emit("room-update", { room });
  });

  socket.on("send-message", ({ roomId, message, user }) => {
    const room = getRoomById(roomId);
    if (!room) return;
    const payload = {
      id: `msg-${Math.random().toString(36).slice(2, 10)}`,
      userId: user.id,
      nickname: user.nickname,
      text: message,
      createdAt: new Date().toISOString(),
    };
    room.messages.push(payload);
    io.to(roomId).emit("room-message", payload);
    io.to(roomId).emit("room-update", { room });
  });

  socket.on("leave-room", ({ roomId, userId }) => {
    const room = leaveRoom(roomId, userId);
    if (!room) return;
    io.to(roomId).emit("room-update", { room });
  });
});

server.listen(port, hostname, () => {
  console.log(`> Ready on http://${hostname}:${port}`);
});
