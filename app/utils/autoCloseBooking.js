import Booking from "@/app/models/booking.model.js";

export async function autoCloseBookings() {
  try {
    // Current local date without time (only yyyy-mm-dd)
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // start of today
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // next day

    const result = await Booking.updateMany(
      {
        date: { $lt: today }, // only strictly before today
        bookingStatus: { $nin: ["closed"] }
      },
      { $set: { bookingStatus: "closed" } }
    );

    console.log("Closed bookings:", result.modifiedCount);
    return result.modifiedCount || 0;
  } catch (error) {
    console.error("autoCloseBookings error:", error);
    return 0;
  }
}
