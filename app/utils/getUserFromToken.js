// utils/getUserFromToken.js
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function getUserFromToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return decoded; // userId, role etc.
  } catch (err) {
    return null;
  }
}
