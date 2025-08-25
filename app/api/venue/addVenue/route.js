import connectDB from "@/app/db/dbConnect"
import Venue from "@/app/models/venue.model.js"
import { verifyTokenAndRole } from "@/app/utils/verifyTokenAndRole.js"

export async function POST(request) {
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
    // console.log(body);
    
    const { venueName, mainImage, description, galleryImages, venueType, contact, location, offers , status  } = body

    if (!venueName || !venueType || !galleryImages  || !mainImage || !description || !contact || !location || !status || !offers) {
        return new Response(JSON.stringify({ error: "required all feilds" }))
    }

    const newVenue = await Venue.create({
        venueName, mainImage, description, galleryImages, venueType, contact, location ,status, offers
    })

    return new Response(JSON.stringify({ newVenue, message: "Venue created successfully" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
    });

    
}
 catch (error) {
        console.error("DB error", error);
        return new Response(JSON.stringify({ error: "failded to create an venue" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }

            }
        );


    }
   

}