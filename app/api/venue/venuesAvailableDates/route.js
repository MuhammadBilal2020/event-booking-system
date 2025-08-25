import Venue from "@/app/models/venue.model.js";
import Booking from "@/app/models/booking.model.js"
import connectDB from "@/app/db/dbConnect.js";

export async function GET(request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const venueId = searchParams.get("venueId");

  if (!venueId) {
    return new Response(JSON.stringify({ error: "venueId is required" }), {
      status: 400,
    });
  }

  try {
    const venue = await Venue.findById(venueId);
    if (!venue) {
      return new Response(JSON.stringify({ error: "Venue not found" }), {
        status: 404,
      });
    }

    // 📅 Generate dates from today to 6 months later
    const today = new Date();
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(today.getMonth() + 6);

    const allAvailableDates = [];
    let current = new Date(today);

    while (current <= sixMonthsLater) {
      allAvailableDates.push(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }

    // 🛑 Get already booked dates for this venue
    const bookedDates = await Booking.find({ venueId }).select("date");
    const bookedDateValues = bookedDates.map(b =>
      b.date.toISOString().split("T")[0]
    );

    // 🎯 Filter out booked dates
    const finalAvailableDates = allAvailableDates.filter(date =>
      !bookedDateValues.includes(date)
    );

    return new Response(JSON.stringify({ availableDates: finalAvailableDates }), {
      status: 200,
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
