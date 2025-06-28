import connectDB from "@/app/db/dbConnect.js";
import Event from '@/app/models/event.model.js'


export async function GET() {

    try {

        await connectDB(); // Connect to MongoDB

        const events = await Event.find(); // Get all users
        console.log(events);

        return new Response(JSON.stringify(events), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    }

    catch (error) {
        console.error("GET events error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}