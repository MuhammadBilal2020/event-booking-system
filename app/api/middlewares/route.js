// // app/api/me/route.js
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const token = cookies().get("accessToken")?.value;
//   if (!token) return NextResponse.json({ user: null }, { status: 401 });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
//     return NextResponse.json({ user: decoded });
//   } catch {
//     return NextResponse.json({ user: null }, { status: 401 });
//   }
// }
