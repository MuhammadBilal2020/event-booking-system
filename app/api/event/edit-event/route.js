import connectDB from "@/app/db/dbConnect";
import Event from '@/app/models/event.model.js';

export async function PUT(request) {
    try {
        await connectDB()
        const body = await request.json()
        console.log(body);
        
        const { id, ...event } = body

        Object.keys(event).forEach((key) => {
            console.log(key);

            if (event[key] === undefined) {
                delete event[key]
            }
        })

        const updateEvent = await Event.findByIdAndUpdate(
            id,
            event,
            {
                new: true,
                runValidators: true,
            }
        )
        console.log(updateEvent);


        if (!updateEvent) {
      return new Response(JSON.stringify({ error: "EVENT not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Event updated", event: updateEvent }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
        




    } catch (error) {
        console.log(`update error : ${error}`);
        
        return new Response(JSON.stringify({error : "failed to update event"}))
       
    }

}