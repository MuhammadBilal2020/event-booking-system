import connectDB from "@/app/db/dbConnect.js";
import User from "@/app/models/user.model.js";

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, email, password, role, adminSecret } = body;

    if (!name || !email || !password || !role ) {
      return new Response(JSON.stringify({ message: "Please fill all fields" }), {
        status: 400,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 409,
      });
    }

    if (role === "admin" && adminSecret !== process.env.ADMIN_SECRET) {
      return new Response(JSON.stringify({ message: "Invalid admin secret password" }), {
        status: 401,
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });

    return new Response(JSON.stringify({ message: "User created successfully", user }), {
      status: 201,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
