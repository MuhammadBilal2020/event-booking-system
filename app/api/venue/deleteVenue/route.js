import connectDB from "@/app/db/dbConnect.js";
import Venue from "@/app/models/venue.model.js"

export async function DELETE(request){
    try {
        await connectDB()
        const body = await request.json()
        const {id} = body

        if(!id){
            return new Response(JSON.stringify({message : "id required"}),{
                status : 400,
                headers : {"Content-Type" : "application/json"},
            }
        )
        }

        const deleteVenue = await Venue.findByIdAndDelete(id)

        if(!deleteVenue){
            return new Response(JSON.stringify({message : "Venue not found"}),{
                status : 404,
                headers : {"Content-Type" : "application/json"}

            }
        );

      
        }

           return new Response(JSON.stringify({ message: "Venue deleted", id }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

        
    } catch (error) {
        console.log(error);
       return new Response(JSON.stringify({ error: "Failed to delete venue" ,error }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
        
        
    }

}