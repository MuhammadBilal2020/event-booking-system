// app/api/user/auth/me/route.js
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    let token;

    // 1) Pehle request headers check kro (manual server fetch case)
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }




    // 2) Agar headers men nahi h to cookies se le lo (browser client case)
    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get("accessToken")?.value;
    }
    console.log("this is the token jo 3 din se nhi mil rha tha : " , token);

    // 3) Agar dono men nahi h to unauthorized
    if (!token) {
      return Response.json({ message: "No token provided" }, { status: 401 });
    }

    // 4) Verify token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    return Response.json({ userId: decoded.userId, role: decoded.role, name: decoded.name });
  } catch (error) {
    return Response.json({ message: "Invalid or expired token" }, { status: 401 });
  }
}

