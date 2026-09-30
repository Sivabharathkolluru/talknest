import { searchRooms } from "@/lib/mock-store";

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("q") || "";
  return Response.json({ results: searchRooms(query) });
}
