// /utils/verifyTokenAndRole.js
export const runtime = "nodejs";
// For backend Apis for permissions
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function verifyTokenAndRole(requiredRole) {
  try {
    const cookieStore = await cookies();
    const token =  cookieStore.get("accessToken")?.value;


    if (!token) {
      return { success: false, status: 401, message: "Unauthorized: No token provided" };
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    console.log(decoded);
    

    if (decoded.role !== requiredRole) {
      return { success: false, status: 403, message: "only admins have access to add venue" };
    }

    
    return { success: true, user: decoded }; // decoded contains user data
  } catch (err) {
    return { success: false, status: 401, message: "Invalid or expired token" };
  }
}
