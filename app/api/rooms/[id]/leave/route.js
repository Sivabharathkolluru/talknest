import { joinRoom } from "@/lib/mock-store";

export async function POST(request, { params }) {
  try {
    const body = await request.json();
    const room = joinRoom(params.id, body.user);
    if (!room) {
      return Response.json({ error: "Room not found." }, { status: 404 });
    }

    return Response.json({ room });
  } catch (error) {
    return Response.json({ error: "Unable to join room." }, { status: 400 });
  }
}
