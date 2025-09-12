
import connectDB from "@/app/db/dbConnect.js";
import Booking from "@/app/models/booking.model.js";
import Venue from "@/app/models/venue.model.js";
import { verifyTokenAndRole } from "@/app/utils/verifyTokenAndRole.js";

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

    // today ka start & end
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // 1. Aaj ki confirmed bookings
    const todayBookings = await Booking.countDocuments({
      bookingStatus: "confirmed",
      date: { $gte: todayStart, $lte: todayEnd }
    });

    // 2. Aaj ki new bookings (pending aur aaj create hui)
    const newBookings = await Booking.countDocuments({
      bookingStatus: "pending",
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });

    // 3. Pending requests (sabhi pending)
    const pendingRequests = await Booking.countDocuments({
      bookingStatus: "pending",
       date: { $gte: todayStart }
    }); 

    // 4. Available venues (total venues - booked venues today)
    const allVenues = await Venue.countDocuments();
    const bookedVenuesToday = await Booking.distinct("venueId", {
      date: { $gte: todayStart, $lte: todayEnd }
    });
    const availableVenues = allVenues - bookedVenuesToday.length;

    return Response.json(
      {
        todayBookings,
        newBookings,
        pendingRequests,
        availableVenues,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
