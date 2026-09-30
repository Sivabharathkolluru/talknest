import { reportUser } from "@/lib/mock-store";

export async function POST(request) {
  try {
    const body = await request.json();
    const report = reportUser(body);
    return Response.json({ report });
  } catch (error) {
    return Response.json({ error: "Unable to submit report." }, { status: 400 });
  }
}
