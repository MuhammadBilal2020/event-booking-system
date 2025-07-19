
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  const cookie = await request.headers.get("cookie") || "";
  const token = cookie
    .split(";")
    .find((c) => c.trim().startsWith("accessToken="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return NextResponse.json({ user: decoded }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
