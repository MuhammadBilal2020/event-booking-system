import connectDB from "@/app/db/dbConnect.js";
import Venue from "@/app/models/venue.model.js"
import { verifyTokenAndRole } from "@/app/utils/verifyTokenAndRole";

export async function GET(request, { params }) {
    const { vanueId } = await params
    console.log(vanueId);

    try {
        await connectDB();
          const authResult = await verifyTokenAndRole(["publicUser" , "Admin"])
                if (!authResult.success) {
                    return new Response(JSON.stringify({ error: authResult.message }), {
                        status: authResult.status
                    }
                    )
                }
        const venue = await Venue.findById((vanueId))

        if (!venue) {
            return new Response(JSON.stringify({ message: "venue not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(venue), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.log(`can't get venue : ${error}`);
        return new Response(JSON.stringify({ error: `failed to get venue detail : ${error}` }))

    }
}