// middleware.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
    const url = req.nextUrl.clone();
    const { pathname } = url;

    // ✅ Public routes jahan middleware ka check skip hoga
    if (
        pathname.startsWith("/api/user/auth/login") ||
        pathname.startsWith("/api/user/auth/refresh") ||
        pathname.startsWith("/frontend/publicUser/loginUser") ||
        pathname.startsWith("/frontend/admin/login")
    ) {
        return NextResponse.next();
    }

    // ✅ Access token check
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
        url.pathname = "/frontend/publicUser/loginUser";
        return NextResponse.redirect(url);
    }

    try {
        // ✅ Node.js runtime allow karta hai jwt.verify use karna
        jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        return NextResponse.next();
    } catch (e) {
        url.pathname = "/frontend/publicUser/loginUser";
        return NextResponse.redirect(url);
    }
}

// ✅ sirf ek hi config rakho
export const config = {
    runtime: "nodejs",  // 👈 nodejs runtime
    matcher: ["/frontend/:path*"], 
};
