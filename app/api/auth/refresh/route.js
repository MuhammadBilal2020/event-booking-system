// app/api/auth/refresh/route.js
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    let refreshToken;

    // 1) Server fetch case → headers se cookie uthao
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const cookieObj = Object.fromEntries(
        cookieHeader.split(";").map((c) => {
          const [k, v] = c.trim().split("=");
          return [k, decodeURIComponent(v)];
        })
      );
      refreshToken = cookieObj.refreshToken;
    }

    // 2) Client/browser case → Next.js cookies() helper se uthao
    if (!refreshToken) {
      const cookieStore = await cookies();
      refreshToken = cookieStore.get("refreshToken")?.value;
    }

    console.log("refresh token :",refreshToken);
    

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token" },
        { status: 401 }
      );
    }

    // 3) Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // 4) Naya access token generate
    const newAccessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role ,name : decoded.name },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    // 5) Response me bhejo (client ko bhi mile, aur cookie bhi update ho jaye)
    const response = NextResponse.json({
      success: true,
      accessToken: newAccessToken, // optional → agar client JS ko chahiye
    });

    // Cookie update
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "lax",
      maxAge: 15 * 60, //15 min
    });

    return response;
  } catch (err) {
    console.error("❌ Refresh error:", err.message);
    return NextResponse.json(
      { success: false, message: "Invalid refresh token" },
      { status: 403 }
    );
  }
}
