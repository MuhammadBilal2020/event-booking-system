'use client'
import React, { useState } from 'react'
import { IoEye } from "react-icons/io5";
import { motion } from "framer-motion";


const ProfileBookingRecords = ({ bookings }) => {

  const [selectedStatus, setSelectedStatus] = useState("All");

  // filter logic
  const filteredBookings =
    selectedStatus === "All"
      ? bookings
      : bookings.filter(b => b.bookingStatus === selectedStatus.toLowerCase());

  // alag bg colors
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      case "cancelled":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };
  return (
    <div className='mb-[4rem] mt-4 px-4' >
      <h1 className='font-semibold text-[1.3rem]'>Booking Handling Records</h1>
      {/* Buttons */}
      <div className='flex gap-3 mt-4'>
        {["All", "Confirmed", "Rejected", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-3 py-1 rounded ${selectedStatus === status ? "bg-black text-white" : "bg-gray-200"
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto mt-1">
        <table className="w-full border-separate border-spacing-y-2 text-sm text-left">
          <thead>
            <tr className='bg-[#3a3a3a] text-white'>
              <th className="px-6 py-3">Booking Venue</th>
              <th className="px-6 py-3">Booking Date</th>
              <th className="px-6 py-3">Booker</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking, i) => (
                <tr key={booking._id + selectedStatus} className="bg-[#e0dfdf] b-record-A">
                  <td className="px-6 py-4 font-medium">{booking.venueId.venueName}</td>
                  <td className="px-6 py-4">{new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{booking.userId.name}</td>
                  <td className="">
                    <span className={`px-3 w-[6rem] text-center inline-block py-1 rounded ${getStatusColor(booking.bookingStatus)}`}>
                      {booking.bookingStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <IoEye size={20} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProfileBookingRecords