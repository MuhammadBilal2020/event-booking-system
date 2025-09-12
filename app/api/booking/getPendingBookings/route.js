import connectDB from "@/app/db/dbConnect.js";
import Booking from "@/app/models/booking.model.js";
import User from "@/app/models/user.model.js";
import Venue from "@/app/models/venue.model.js";


import { verifyTokenAndRole } from "@/app/utils/verifyTokenAndRole.js";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        await connectDB();

        // ********Need fo both Admin and User


        const authResult = await verifyTokenAndRole("Admin")
        if (!authResult.success) {
            return new Response(JSON.stringify({ error: authResult.message }), {
                status: authResult.status
            }
            )
        }


        const today = new Date();
        today.setHours(0, 0, 0, 0); // aaj ki date ka start

        const bookings = await Booking.find({
            bookingStatus: "pending",
            date: { $gte: today }   // sirf aaj ke baad wali bookings
        })
            .populate("venueId", "venueName")
            .populate("userId", "name email");


        return NextResponse.json({ success: true, bookings }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
