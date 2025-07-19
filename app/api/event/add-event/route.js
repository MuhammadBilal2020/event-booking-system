import connectDB from "@/app/db/dbConnect.js";
import Event from '@/app/models/event.model.js'

export async function POST(request) { 
    try {
        await connectDB()
        const body = await request.json()
        console.log(body);
        const { title, description, location, date } = body

        if (!title) {
            return new Response(JSON.stringify({ error: "title is required" }))
        }

        if (!description) {
            return new Response(JSON.stringify({ error: "decsription is required" }))
        }

        if (!location) {
            return new Response(JSON.stringify({ error: "location is required" }))
        }

        if (!date) {
            return new Response(JSON.stringify({ error: "date is required" }))
        }

        const newEvent = await Event.create({
            title, description, location, date
        })
        return new Response(JSON.stringify({ newEvent, message: "new event created successfully" }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });

    }

    catch (error) {
        console.error("DB error", error);
        return new Response(JSON.stringify({ error: "failded to create an event" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }

            }
        );


    }
}