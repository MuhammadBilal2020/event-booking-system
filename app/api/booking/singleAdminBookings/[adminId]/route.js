
import connectDB from "@/app/db/dbConnect.js";
import { verifyTokenAndRole } from "@/app/utils/verifyTokenAndRole";
import Booking from "@/app/models/booking.model.js";
import Venue from "@/app/models/venue.model.js";
import User from "@/app/models/user.model.js";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { adminId } = await params;
    console.log(adminId);
    
    try {
      await connectDB();
      const authResult = await verifyTokenAndRole("Admin")
              if (!authResult.success) {
                  return new Response(JSON.stringify({ error: authResult.message }), {
                      status: authResult.status
                  }
                  )
              }

    const bookings = await Booking.find({ "actions.adminId": adminId })
      .populate("venueId", "venueName")
      .populate("userId", "name email")
      .populate("actions.adminId", "name email"); 

    return NextResponse.json({ success: true, bookings }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
