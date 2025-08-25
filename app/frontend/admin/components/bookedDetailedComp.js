"use client"
import React, { useState } from "react"
import { Calendar, MapPin, User, Mail, Phone, DollarSign } from "lucide-react"

const BookedDetailedComp = ({ booker, booking }) => {
  const [status, setStatus] = useState(booking?.status || "pending")

  return (
    <div className="space-y-4">
      {/* Booking Header */}
      <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] p-5 rounded-2xl shadow-md text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{booking.event}</h1>
            <p className="flex items-center gap-2 mt-1 text-sm opacity-90">
              <Calendar size={16} /> {booking.bookingDate} | {booking.timing}
            </p>
            <p className="mt-1 text-sm opacity-90">{booking.guest} Guests</p>
          </div>
          <div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                status === "accepted"
                  ? "bg-green-600"
                  : status === "cancelled"
                  ? "bg-gray-600"
                  : "bg-red-500"
              }`}
            >
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Venue Info */}
        <div className="p-3 bg-gradient-to-r from-[#e0eafc] to-[#cfdef3] rounded-lg shadow-sm hover:shadow-md transition">
          <h2 className="text-base font-semibold mb-2 flex items-center gap-2 text-[#333]">
            <MapPin size={16} className="text-[#667eea]" /> Venue
          </h2>
          <p className="text-sm"><span className="font-medium">Name:</span> {booking.venueName || "—"}</p>
          <p className="text-sm"><span className="font-medium">Location:</span> {booking.venueLocation || "—"}</p>
        </div>

        {/* Booker Info */}
        <div className="p-3 bg-gradient-to-r from-[#e0eafc] to-[#cfdef3] rounded-lg shadow-sm hover:shadow-md transition">
          <h2 className="text-base font-semibold mb-2 flex items-center gap-2 text-[#333]">
            <User size={16} className="text-[#667eea]" /> Booker
          </h2>
          <p className="text-sm"><span className="font-medium">Name:</span> {booker.bookerName}</p>
          <p className="text-sm flex items-center gap-2"><Mail size={14} /> {booker.email}</p>
          <p className="text-sm flex items-center gap-2"><Phone size={14} /> {booker.bookerPhone}</p>
          <p className="text-sm"><span className="font-medium">Address:</span> {booker.address || "—"}</p>
        </div>
      </div>

      {/* Booking Details */}
      <div className="p-3 bg-gradient-to-r from-[#e0eafc] to-[#cfdef3] rounded-lg shadow-sm hover:shadow-md transition">
        <h2 className="text-base font-semibold mb-2 flex items-center gap-2 text-[#333]">
          <DollarSign size={16} className="text-[#667eea]" /> Booking Info
        </h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p><span className="font-medium">Offer:</span> {booking.offer || "—"}</p>
          <p><span className="font-medium">Expense:</span> {booking.totalExpense || "—"}</p>
        </div>

        {/* Status Buttons */}
        <div className="mt-3 flex gap-2">
          {status === "accepted" ? (
            <button
              className="bg-red-500 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-red-600"
              onClick={() => setStatus("cancelled")}
            >
              Cancel
            </button>
          ) : (
            <button
              className="bg-[#667eea] text-white px-3 py-1.5 text-sm rounded-lg hover:opacity-90"
              onClick={() => setStatus("accepted")}
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
