import connectDB from "@/app/db/dbConnect";
import Booking from "@/app/models/booking.model.js"
import User from "@/app/models/user.model.js";
import Venue from "@/app/models/venue.model.js";
import { autoCloseBookings } from "@/app/utils/autoCloseBooking";
import { verifyTokenAndRole } from "@/app/utils/verifyTokenAndRole";
// import { autoCloseBookings } from "@/app/utils/autoCloseBookings";

export async function GET() {
  try {
    await connectDB();

    // ********Need for both Admin and User
    const authResult = await verifyTokenAndRole(["Admin"]);
    if (!authResult.success) {
      return new Response(JSON.stringify({ error: authResult.message }), {
        status: authResult.status
      });
    }

    // 👇 yahan automatic expired bookings close karwa li
    const closedCount = await autoCloseBookings();

    const allBookings = await Booking.find()
      .populate("venueId", "venueName")
      .populate("userId", "name email");

    return new Response(
      JSON.stringify({
        success: true,
        closedCount, // kitni bookings abhi abhi close hui
        bookings: allBookings
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.log(`cant get bookings because : ${error}`);
    return new Response(
      JSON.stringify({ error: `failed to get bookings : ${error}` }),
      { status: 500 }
    );
  }
}
