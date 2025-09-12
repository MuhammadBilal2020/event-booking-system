"use client";
import { fetchWithRefreshClient } from "@/app/utils/clientInterceptor";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoEye, IoFilter } from "react-icons/io5";

import { useState } from "react";
import Link from "next/link";

const BookingsTable = ({ bookingsFromServer, adminId }) => {
    const [bookings, setBookings] = useState(bookingsFromServer);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const getStatusColor = (status) => {
        switch (status) {
            case "confirmed":
                return "text-green-500 ";
            case "rejected":
                return "text-red-500 ";
            case "cancelled":
                return "text-orange-500 ";
            case "pending":
                return "text-blue-500 ";
            default:
                return "text-gray-400 ";
        }
    };
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

                <thead>
                    <tr className="bg-[#3a3a3a] text-white">
                        <th className="px-6 w-[14.5rem] py-3">Booking Venue</th>
                        <th className="px-6 w-[14.5rem] py-3">Booking Date</th>
                        <th className="px-6 w-[14.5rem] py-3">Booker</th>
                        <th className="px-6 w-[14.5rem] py-3">Status</th>
                        <th className="px-6 w-[11.3rem] py-3">
                            <button className="text-black block ms-auto hover:bg-[black] hover:text-[white] bg-white p-1" >
                                <IoFilter className="font-bold text-[1rem]" />
                            </button>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        [...bookings]
                            .sort((a, b) => a.bookingStatus.localeCompare(b.bookingStatus))
                            .map((booking) => (
                                <tr key={booking._id} className="bg-[#e0dfdf]">
                                    <td className="px-6 py-4">{booking.venueId.venueName}</td>
                                    <td className="px-6 py-4">
                                        {new Date(booking.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">{booking.userId.name}</td>
                                    <td className="px-6 py-4">
                                        <div
                                            className={`px-3 py-1 rounded text-center w-[6rem] bg-[#eae9e9] ${getStatusColor(
                                                booking.bookingStatus
                                            )}`}
                                        >
                                            {booking.bookingStatus}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 flex gap-3 relative">
                                        <Link
                                            href={`/frontend/admin/booking/bookingdetail/${booking._id}`}
                                            className=""
                                        >
                                            <IoEye size={20} />
                                        </Link>
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

export default BookingsTable;
