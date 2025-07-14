// GET /api/user/auth/me
import { verifyToken } from "@/app/middleware/verifyToken";

export async function GET(request) {
  const user = verifyToken(request);
  if (!user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify({ user }), {
    status: 200,
  });
}
