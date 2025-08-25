export const runtime = "nodejs";
import connectDB from "@/app/db/dbConnect.js";
import User from "@/app/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const { email, password, adminSecret, role } = await request.json();

    if (!email || !password || !role) {
      return NextResponse.json({ message: "Please fill all required fields" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ message: "Wrong password" }, { status: 401 });

    if (role === "Admin") {
      if (user.role !== "Admin") {
        return NextResponse.json({ message: "Not an admin account" }, { status: 403 });
      }
      if (adminSecret !== process.env.ADMIN_SECRET) {
        return NextResponse.json({ message: "Invalid admin secret" }, { status: 401 });
      }
    } else if (role === "publicUser") {
      if (user.role === "Admin") {
        return NextResponse.json({ message: "Admin cannot login here" }, { status: 403 });
      }
    } else {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    // ✅ Tokens
    const accessToken = jwt.sign(
      { userId: user._id.toString(), role: user.role, email: user.email, name: user.name },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "1m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role , name: user.name },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Response with cookies
    const res = NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
       
      
    } ,{ status: 200 });

  res.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 1 * 60, // 15 minutes in seconds
  });

  res.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  });

  console.log(res);


  return res;
} catch (error) {
  console.error("Login error:", error);
  return NextResponse.json({ message: "Internal server error" }, { status: 500 });
}
}
