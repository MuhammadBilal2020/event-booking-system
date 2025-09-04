import connectDB from "@/app/db/dbConnect.js";
import User from '@/app/models/user.model.js';
export async function GET(req , {params}) {
    const { uid } = await params;
    try {
        await connectDB()
        const user = await  User.findById((uid))
        console.log(user)


        if (!user) {
      return new Response(JSON.stringify({ message: "user not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    }
    catch (error) {
 console.error("GET single user error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch userr" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
    }
}