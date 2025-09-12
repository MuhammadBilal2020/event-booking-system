"use client";
import { fetchWithRefreshClient } from "@/app/utils/clientInterceptor";
import { IoEye } from "react-icons/io5";
import { useState } from "react";

const PendingBookingsTable = ({ bookingsFromServer, adminId }) => {
  const [bookings, setBookings] = useState(bookingsFromServer);



  const handleAction = async (bookingId, action) => {
    try {
      const res = await fetchWithRefreshClient(`/api/booking/updateBookingStatus`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",   // cookie bhejne ke liye
        body: JSON.stringify({ bookingId, adminId, action }),
      });

      const data = await res.json();

      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b._id === data.booking._id ? data.booking : b))
        );
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="w-full border-separate border-spacing-y-2 text-sm text-left">
        <caption className="pt-5 pb-3 text-lg font-semibold text-gray-900">
          Pending Requests
        </caption>
        <thead>
          <tr className="bg-[#3a3a3a] text-white">
            <th className="px-6 py-3">Booking Venue</th>
            <th className="px-6 py-3">Booking Date</th>
            <th className="px-6 py-3">Booker</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking._id} className="bg-[#e0dfdf]">
                <td className="px-6 py-4">{booking.venueId?.venueName || "Deleted Venue"
                }</td>
                <td className="px-6 py-4">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{booking.userId.name}</td>
                <td className="px-6 py-4">
                  <span className="text-red-500 px-3 py-1 rounded text-center w-[6rem] bg-[#eae9e9]">
                    {booking.bookingStatus}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-center gap-3">
                  <button
                    onClick={() => handleAction(booking._id, "confirmed")}
                    className="bg-green-600 text-white w-[6rem] p-2 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(booking._id, "rejected")}
                    className="bg-blue-600 text-white w-[6rem] p-2 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No bookings
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingBookingsTable;
