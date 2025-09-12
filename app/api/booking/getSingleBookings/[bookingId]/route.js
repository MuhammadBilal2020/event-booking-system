import connectDB from "@/app/db/dbConnect.js";
import Booking from "@/app/models/booking.model.js";
import User from "@/app/models/user.model.js";
import Venue from "@/app/models/venue.model.js";
import { verifyTokenAndRole } from "@/app/utils/verifyTokenAndRole.js";

export async function GET(request, { params }) {
  const { bookingId } = await params;

  try {
    await connectDB();
    const authResult = await verifyTokenAndRole("Admin")
        if (!authResult.success) {
            return new Response(JSON.stringify({ error: authResult.message }), {
                status: authResult.status
            }
            )
        }


    // booking fetch karo
    const booking = await Booking.findById(bookingId)
      .populate("venueId", "venueName location offers") // offers bhi laao
      .populate("userId", "name email");

    if (!booking) {
      return new Response(
        JSON.stringify({ message: "booking not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // venue ke andar se matching offer dhoondo
    let selectedOffer = null;
    if (booking.venueId?.offers && booking.offerId) {
      selectedOffer = booking.venueId.offers.find(
        (offer) => offer.offerId === booking.offerId
      );
    }

    // final response: booking + selectedOffer add kar do
    const responseData = {
      ...booking.toObject(),
      selectedOffer, // ye poora object milega (offerName, price, desc, etc.)
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(`can't get booking : ${error}`);
    return new Response(
      JSON.stringify({ error: `failed to get booking detail : ${error}` }),
      { status: 500 }
    );
  }
}
