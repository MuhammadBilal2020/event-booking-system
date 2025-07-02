import connectDB from "@/app/db/dbConnect.js";
import Event from '@/app/models/event.model.js';
export async function DELETE(request) {

    try {
        await connectDB()
        const body = await request.json()
        const { id } = body

        if (!id) {
            return new Response(JSON.stringify({ error: "Event ID is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            })
        }

        const deletedEvent = await Event.findByIdAndDelete(id)

        if (!deletedEvent) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "User deleted", id }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });


    } catch (error) {
        console.error("DELETE error:", error);
        return new Response(JSON.stringify({ error: "Failed to delete user" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}