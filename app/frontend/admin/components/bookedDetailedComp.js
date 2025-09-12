"use client"
import React, { useState } from "react"
import { Calendar, MapPin, User, Mail, Phone, DollarSign } from "lucide-react"
import { fetchWithRefreshClient } from "@/app/utils/clientInterceptor.js"
import { IoFilter } from "react-icons/io5";


const BookedDetailedComp = ({  booking ,adminId }) => {
  const [status, setStatus] = useState(booking?.bookingStatus || "pending")
  const [bookings, setBookings] = useState(booking);

  console.log(booking);
  

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
          // setStatus("cancelled")
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error("Error updating booking:", err);
      }
    }; 

  return (
    <div className="space-y-6">
  {/* Booking Header */}
  <div className="bg-gradient-to-r from-[#1f1f1f] to-[#2c2c2c] p-6 rounded-2xl shadow-lg text-white">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">No event </h1>
        <p className="flex items-center gap-2 mt-2 text-sm text-gray-300">
          <Calendar size={16} /> {booking.date} | No Time 
        </p>
        <p className="mt-1 text-sm text-gray-300">- - - -  Guests</p>
      </div>
      <span
        className={`px-4 py-1 rounded-full text-sm font-semibold ${
          status === "confirmed"
            ? "bg-green-500"
            : status === "cancelled"
            ? "bg-gray-500"
            : "bg-red-500"
        }`}
      >
        {booking.bookingStatus}
      </span>
    </div>
  </div>

  {/* Details Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Venue Info */}
    <div className="p-6 bg-gradient-to-r from-[#e0e0e0] to-[#f0f0f0] rounded-xl shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
        <MapPin size={22} className="text-black" /> Venue Details
      </h2>
      <div className="mt-4 space-y-2 text-gray-700 text-[1rem]">
        <p><span className="font-medium">Name:</span> {booking.venueId.venueName || "No Venue"}</p>
        <p><span className="font-medium">Location:</span> {booking.venueId.location || "—"}</p>
      </div>
    </div>

    {/* Booker Info */}
    <div className="p-6 bg-gradient-to-r from-[#e0e0e0] to-[#f0f0f0] rounded-xl shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
        <User size={22} className="text-black" /> Booker Details
      </h2>
      <div className="mt-4 space-y-2 text-gray-700 text-[1rem]">
        <p><span className="font-medium">Name:</span> {booking.userId.name}</p>
        {/* <p><span className="font-medium">Address:</span> {booker.address || "None"}</p> */}
        <p className="flex items-center gap-2"><Mail size={16} /> {booking.userId.email}</p>
        {/* <p className="flex items-center gap-2"><Phone size={16} /> {booker.bookerPhone}</p> */}
      </div>
    </div>
  </div>

  {/* Booking Info */}
  <div className="p-6 bg-gradient-to-r from-[#e0e0e0] to-[#f0f0f0] rounded-xl shadow hover:shadow-md transition">
    <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
      <DollarSign size={18} className="text-indigo-500" /> Booking Info
    </h2>
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700 text-[1rem]">
      <p><span className="font-medium">Offer:</span> {booking.selectedOffer.offerName || "—"}</p>
      <p><span className="font-medium">Expense:</span> {booking.totalPrice || "—"}</p>
      <p><span className="font-medium">Booking Date:</span>  {new Date(booking.date).toLocaleDateString()}</p>

    </div>

    {/* Status Buttons */}
    <div className="mt-6 flex flex-wrap gap-4">
      {status === "confirmed" ? (
        <button
          className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-red-600 border border-transparent hover:border-red-600 transition"
          onClick={() => handleAction(booking._id, "cancelled")}
        >
          Cancel
        </button>


        
      ) : (
        <button
          className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-black border border-transparent hover:border-black transition"
          onClick={() => handleAction(booking._id, "confirmed")}
        >
          Accept
        </button>
      )}
    </div>
  </div>
</div>

  )
}

export default BookedDetailedComp

{/* <button
                                                onClick={() => handleAction(booking._id, "cancelled")}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                            >
                                                Cancel Booking
                                            </button> */}
