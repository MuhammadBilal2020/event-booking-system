import connectDB from "@/app/db/dbConnect";
import Booking from "@/app/models/booking.model.js";
import Venue from "@/app/models/venue.model.js";
import User from "@/app/models/user.model.js";
import { NextResponse } from "next/server";
import { verifyTokenAndRole } from "@/app/utils/verifyTokenAndRole.js";

export async function GET(req , {params}) {
const {userId} = await params
console.log(userId);

    try {
      await connectDB()
       const authResult = await verifyTokenAndRole("publicUser")
              if (!authResult.success) {
                  return new Response(JSON.stringify({ error: authResult.message }), {
                      status: authResult.status
                  }
                  )
              }
      const userbookings = await  Booking.find({userId})
      .populate("venueId" ,"venueName");


      return NextResponse.json({success : true , userbookings} , {status : 200});

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}