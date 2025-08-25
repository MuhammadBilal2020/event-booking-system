import connectDB from "@/app/db/dbConnect";
import Venue from "@/app/models/venue.model.js"

export async function PUT(request) {
    try {
        await connectDB()
        const body = await request.json()
        console.log(body);
        
        const { id, ...venue } = body

        Object.keys(venue).forEach((key) => {
            console.log(key);

            if (venue[key] === undefined) {
                delete venue[key]
            }
        })

        const updateVenue = await Venue.findByIdAndUpdate(
            id,
            venue,
            {
                new: true,
                runValidators: true,
            }
        )
        console.log(updateVenue);


        if (!updateVenue) {
      return new Response(JSON.stringify({ error: "Venue not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Venue updated", venue: updateVenue }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
        




    } catch (error) {
        console.log(`update error : ${error}`);
        
        return new Response(JSON.stringify({error : "failed to update event"}))
       
    }

}