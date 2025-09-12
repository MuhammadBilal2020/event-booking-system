import connectDB from "@/app/db/dbConnect.js";
import Venue from "@/app/models/venue.model.js"
import { verifyTokenAndRole } from "@/app/utils/verifyTokenAndRole";

export async function PUT(request) {
    try {
        await connectDB()

        const authResult = await verifyTokenAndRole("Admin")
        if (!authResult.success) {
            return new Response(JSON.stringify({ error: authResult.message }), {
                status: authResult.status
            }
            )
        }
        const body = await request.json()

        const { id } = body

        if (!id) {
            return new Response(JSON.stringify({ message: "id required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            }
            )
        }

        const deleteVenue = await Venue.findByIdAndUpdate(id, { isDeleted: true });


        if (!deleteVenue) {
            return new Response(JSON.stringify({ message: "Venue not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" }

            }
            );


        }

        return new Response(JSON.stringify({ message: "Venue deleted", id }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });


    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Failed to delete venue", error }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });


    }

}