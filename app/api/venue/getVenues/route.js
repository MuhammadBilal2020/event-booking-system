
import connectDB from "@/app/db/dbConnect";
import Venue from "@/app/models/venue.model.js"
import { verifyTokenAndRole } from "@/app/utils/verifyTokenAndRole";
import { cookies } from "next/headers";

export async function GET(){ 
try {
    await connectDB()
     const authResult = await verifyTokenAndRole("Admin")   
        if (!authResult.success) {
            return new Response(JSON.stringify({ error: authResult.message }), {
                status: authResult.status
            }
            )
        }
     
    const allVenues = await Venue.find()
    
 
    return new Response(JSON.stringify(allVenues),{
        status : 200,
        headers: { "Content-Type": "application/json" },
    })
    
} catch (error) {
    console.log(`cant get venue because : ${error}`);
    return new Response(JSON.stringify({error : `failed to get venues : ${error}`}))
    
}
}