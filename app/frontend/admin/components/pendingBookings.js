"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const PendingBookings = () => {
  const booking = [{
    id : "1",
    event :"City",
    bookingDate : "12/4/2025",
    timing : "9:00pm",
    guest : "500",
    bookerName : "Bilal",
    bookerPhone : "035638296589"
  }]
  const [pendingBookings, setPendingBokkings] = useState(booking)
  return (
    <>
     <table className="table-auto w-full text-left  -gray-300">
  <thead className="bg-gray-200">
    <tr>
      <th className="shadow-sm px-4 py-2">Venue</th>
      <th className="shadow-sm px-4 py-2">Booking Date</th>
      <th className="shadow-sm px-4 py-2">Timing</th>
      <th className="shadow-sm px-4 py-2">Guest</th>
    </tr>
  </thead>
  <tbody>
    {pendingBookings && pendingBookings.length > 0 ? (
      pendingBookings.map((pb, index) => (
        <tr key={pb.id} className= "shadow-sm hover:bg-gray-100">
         
          <td className="  px-4 py-2">
            <Link className='hover:text-[red]' href={`/frontend/admin/booking/bookingdetail/${pb.id}`}>{pb.event}</Link>
          </td>
         
          <td className="  px-4 py-2">{pb.bookingDate}</td>
          <td className="  px-4 py-2">{pb.timing}</td>
          <td className="  px-4 py-2">{pb.guest}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4" className="text-center py-4">No Pending Bookings</td>
      </tr>
    )}
  </tbody>
</table>

    </>
  )
}

export default PendingBookings




//amenities: [AmenitySchema], // array of objects with name


// Amenities schema (sub-document)
// const AmenitySchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
// });