import { blockUser } from "@/lib/mock-store";

export async function POST(request) {
  try {
    const body = await request.json();
    const block = blockUser(body);
    return Response.json({ block });
  } catch (error) {
    return Response.json({ error: "Unable to update block list." }, { status: 400 });
  }
}
