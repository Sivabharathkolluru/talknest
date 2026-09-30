import { listRooms, createRoom } from "@/lib/mock-store";

export async function GET() {
  return Response.json({ rooms: listRooms() });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const room = createRoom({
      name: body.name,
      description: body.description,
      topic: body.topic,
      language: body.language,
      privacy: body.privacy,
      maxParticipants: body.maxParticipants,
      city: body.city,
      state: body.state,
      host: {
        id: body.host?.id || `host-${Date.now()}`,
        nickname: body.host?.nickname || "Host",
        city: body.host?.city || body.city || "India",
        state: body.host?.state || body.state || "India",
      },
    });

    return Response.json({ room });
  } catch (error) {
    return Response.json({ error: "Unable to create room." }, { status: 400 });
  }
}
