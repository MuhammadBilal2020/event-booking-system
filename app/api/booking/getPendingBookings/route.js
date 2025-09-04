import connectDB from "@/app/db/dbConnect";

import Booking from "@/app/models/booking.model.js";
import { verifyTokenAndRole } from "@/app/utils/verifyTokenAndRole.js";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        await connectDB();

        const authResult = await verifyTokenAndRole("Admin")
        if (!authResult.success) {
            return new Response(JSON.stringify({ error: authResult.message }), {
                status: authResult.status
            }
            )
        }


        const bookings = await Booking.find({ bookingStatus: "pending" })
            .populate("venueId", "name")
            .populate("userId", "name email");

        return NextResponse.json({ success: true, bookings }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
