import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserFromServer() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
}
