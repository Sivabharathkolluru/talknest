import { getRoomById, joinRoom, leaveRoom, requestSpeak } from "@/lib/mock-store";

export async function POST(request) {
  try {
    const body = await request.json();
    const room = joinRoom(body.roomId, body.user);
    if (!room) {
      return Response.json({ error: "Room not found." }, { status: 404 });
    }
    return Response.json({ room });
  } catch (error) {
    return Response.json({ error: "Unable to join room." }, { status: 400 });
  }
}

export async function GET(request, { params }) {
  const roomId = params?.id || request.nextUrl.searchParams.get("roomId");
  const room = getRoomById(roomId);
  if (!room) {
    return Response.json({ error: "Room not found." }, { status: 404 });
  }
  return Response.json({ room });
}
