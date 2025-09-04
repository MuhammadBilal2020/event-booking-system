import connectDB from "@/app/db/dbConnect.js";
import { verifyTokenAndRole } from "@/app/utils/verifyTokenAndRole.js";
import Booking from "@/app/models/booking.model.js"
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        // verify user login and only admin access to this api 
        const authResult = await verifyTokenAndRole("publicUser")
        if (!authResult.success) {
            return new Response(JSON.stringify({ error: authResult.message }), {
                status: authResult.status
            }
            )
        }

        const body = await req.json();
        const { venueId, userId, date, offerId, totalPrice, paymentMode, userNote } = body;

        if (!venueId || !userId || !date || !totalPrice || !paymentMode) {
            return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
        }

        const booking = await Booking.create({
            venueId,
            userId,
            date,
            offerId,
            totalPrice,
            paymentMode,
            bookingStatus: "pending",
            userNote,
        });


        return NextResponse.json({ success: true, booking }, { status: 201 });

    }

    catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}