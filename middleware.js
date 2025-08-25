// middleware.js
import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
import LoginPage from "./app/frontend/admin/login/page";
import { checkAccessToken } from "./app/utils/checkAcecessToken.js";

export function middleware(req) {
    const url = req.nextUrl.clone();
    const { pathname } = url;

    // Public routes jahan redirect nahi karna
    if (
        pathname.startsWith("/api/user/auth/login") || // API login ko bhi exclude karen
        pathname.startsWith("/api/user/auth/refresh") || // API refresh ko bhi exclude karen
        pathname.startsWith("/frontend/publicUser/loginUser") ||
        pathname.startsWith("/frontend/admin/login")
    ) {
        return NextResponse.next();
    }

    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
        url.pathname = "/frontend/publicUser/loginUser";
        return NextResponse.redirect(url);
    }


   checkAccessToken(accessToken)

}



export const config = {
    matcher: ["/frontend:path*"],
};

