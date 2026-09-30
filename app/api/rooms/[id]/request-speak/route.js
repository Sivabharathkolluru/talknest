import { leaveRoom } from "@/lib/mock-store";

export async function POST(request, { params }) {
  try {
    const body = await request.json();
    const room = leaveRoom(params.id, body.userId);
    if (!room) {
      return Response.json({ error: "Room not found." }, { status: 404 });
    }

    return Response.json({ room });
  } catch (error) {
    return Response.json({ error: "Unable to leave room." }, { status: 400 });
  }
}
