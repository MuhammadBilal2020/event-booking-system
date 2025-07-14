import connectDB from "@/app/db/dbConnect.js";
import User from "@/app/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password, adminSecret } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ message: "Please fill all fields" }), {
        status: 400,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "wrong passw" }), {
        status: 401,
      });
    }
 
    if (user.role === "admin") {
      if (adminSecret !== process.env.ADMIN_SECRET) {
        return new Response(JSON.stringify({ message: "Invalid admin secret" }), {
          status: 401,
        });
      }
    }

    // Generate Access Token (short life)
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role ,name : user.name },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    // Generate Refresh Token (long life)
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookies
    const response = new Response(
      JSON.stringify({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": [
            `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=900; SameSite=Strict; Secure`,
            `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Strict; Secure`,
          ],
          "Content-Type": "application/json",
        },
      }
    );

    return response;

  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
