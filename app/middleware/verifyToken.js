import jwt from "jsonwebtoken";

export function verifyToken(request) {
  try {
    const cookie = request.headers.get("cookie") || "";
    const token = cookie
      .split(";")
      .find((c) => c.trim().startsWith("accessToken="))
      ?.split("=")[1]; 

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return decoded; // contains userId, role etc.
  } catch (err) {
    return null;
  }
}
