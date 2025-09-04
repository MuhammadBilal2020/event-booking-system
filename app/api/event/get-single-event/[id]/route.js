import connectDB from "@/app/db/dbConnect.js";
import Event from '@/app/models/event.model.js';

export async function GET(request, { params }) {
  const { id } = await params;
 
  try {
    await connectDB();

    const event = await Event.findById((id));
    console.log(event)
    

    if (!event) {
      return new Response(JSON.stringify({ message: "Event not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(event), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("GET single event error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch event" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
