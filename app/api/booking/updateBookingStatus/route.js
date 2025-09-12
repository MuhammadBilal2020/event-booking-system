import connectDB from "@/app/db/dbConnect";
import Booking from "@/app/models/booking.model.js";
import { verifyTokenAndRole } from "@/app/utils/verifyTokenAndRole";
import { NextResponse } from "next/server";

export async function PUT(req) {

  try {
    await connectDB();
    const authResult = await verifyTokenAndRole("Admin")
    if (!authResult.success) {
      return new Response(JSON.stringify({ error: authResult.message }), {
        status: authResult.status
      }
      )
    }

    const body = await req.json();
    const { bookingId, adminId, action } = body;

    if (!bookingId || !adminId || !action) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    if (!["confirmed", "rejected", "cancelled"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        bookingStatus: action,
        $push: {
          actions: {
            adminId,
            action,
          },
        },
      },
      { new: true }
    )
      .populate("venueId", "venueName")
      .populate("userId", "name email")
      .populate("actions.adminId", "name email");

    if (!updatedBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking: updatedBooking }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
