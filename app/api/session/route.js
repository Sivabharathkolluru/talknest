import { createSession, listRooms, searchRooms, createRoom, getRoomById, joinRoom, leaveRoom, requestSpeak, approveSpeaker, reportUser, blockUser, getDashboardStats } from "@/lib/mock-store";

export async function POST(request) {
  try {
    const body = await request.json();
    const user = createSession({
      nickname: body.nickname,
      language: body.language,
      state: body.state,
      city: body.city,
    });

    return Response.json({ user });
  } catch (error) {
    return Response.json({ error: "Unable to create anonymous session." }, { status: 400 });
  }
}
