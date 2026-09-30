import { getRoomById, joinRoom, leaveRoom, requestSpeak, approveSpeaker } from "@/lib/mock-store";

export async function POST(request, { params }) {
  const roomId = params.id;
  const room = getRoomById(roomId);
  if (!room) {
    return Response.json({ error: "Room not found." }, { status: 404 });
  }

  const body = await request.json();
  if (body.action === "join") {
    return Response.json({ room: joinRoom(roomId, body.user) });
  }

  if (body.action === "leave") {
    return Response.json({ room: leaveRoom(roomId, body.userId) });
  }

  if (body.action === "request-speak") {
    return Response.json({ room: requestSpeak(roomId, body.userId) });
  }

  if (body.action === "approve-speaker") {
    return Response.json({ room: approveSpeaker(roomId, body.userId) });
  }

  return Response.json({ room });
}
