import connectDB from "@/app/db/dbConnect";
import Venue from "@/app/models/venue.model.js"

export async function GET(){
try {
    await connectDB()
    const allVenues = await Venue.find()
    console.log(allVenues);

    return new Response(JSON.stringify(allVenues),{
        status : 200,
        headers: { "Content-Type": "application/json" },
    })
    
} catch (error) {
    console.log(`cant get venue because : ${error}`);
    return new Response(JSON.stringify({error : `failed to get venues`}))
    
}
}