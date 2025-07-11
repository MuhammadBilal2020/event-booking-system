"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { FaVenus } from "react-icons/fa";

export default function Sidebar({title}) {
    const [open, setOpen] = useState(false);
    const [venueOpen, setVenueOpen] = useState(false);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [settingOpen, setSettingOpen] = useState(false);


    return (
        <>
            <div className='bg-[#1d4ed8] flex justify-start p-2 text-[white] text-[1.4rem] font-medium'>
                <div className="w-[36rem]">
                    <button
                        onClick={() => setOpen(true)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        <FaBars />
                    </button>
                </div>
                <div>{title}</div>
            </div>

            {open && (
                <div className="fixed top-13 left-0 z-40 w-64 h-screen p-4 overflow-y-auto bg-white text-black">
                    <h5 className="text-base font-semibold uppercase">Menu</h5>
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-lg hover:bg-gray-200"
                    >
                        ✖
                    </button>

                    <div className="py-4">
                        <ul className="space-y-2 font-medium">
                            {/* Dashboard */}
                            <li>
                                <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 group">
                                    <BiSolidDashboard className="text-gray-500 group-hover:text-gray-900" size={20} />
                                    <span>Dashboard</span>
                                </Link>
                            </li>

                            {/* Venue with dropdown */}
                            <li>
                                <button
                                    onClick={() => setVenueOpen(!venueOpen)}
                                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 group"
                                >
                                    <FaVenus className="text-gray-500 group-hover:text-gray-900" size={20} />
                                    <span>Venue</span>
                                </button>

                                {venueOpen && (
                                    <ul className="pl-2">
                                        <li>
                                            <Link
                                                href="#"
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 group ml-5"
                                            >
                                                <span className="text-gray-500 group-hover:text-gray-900">•</span>
                                                <span className="whitespace-nowrap">View All Venues </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="#"
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 group ml-5"
                                            >
                                                <span className="text-gray-500 group-hover:text-gray-900">•</span>
                                                <span className="whitespace-nowrap">Add New Venues</span>
                                            </Link>
                                        </li>
                                          <li>
                                            <Link
                                                href="#"
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 group ml-5"
                                            >
                                                <span className="text-gray-500 group-hover:text-gray-900">•</span>
                                                <span className="whitespace-nowrap"> Unbooked Venues</span>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>


                            {/* Booking with dropdown */}
                            <li>
                                <button
                                    onClick={() => setBookingOpen(!bookingOpen)}
                                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 group"
                                >
                                    <FaBookmark className="text-gray-500 group-hover:text-gray-900" size={20} />
                                    <span>Booking</span>
                                </button>
                                {bookingOpen && (
                                   <ul className="pl-2">
                                        <li>
                                            <Link
                                                href="#"
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 group ml-5"
                                            >
                                                <span className="text-gray-500 group-hover:text-gray-900">•</span>
                                                <span className="whitespace-nowrap"> View All Bookings</span>
                                            </Link>
                                        </li>
                                       
                                    </ul>
                                )}
                            </li>

                            {/* Settings */}
                            <li>
                                <button  onClick={() => setSettingOpen(!settingOpen)} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 group">
                                    <IoMdSettings className="text-gray-500 group-hover:text-gray-900" size={20} />
                                    <span>Setting</span>
                                </button>
                                {settingOpen && (
                                   <ul className="pl-2">
                                        <li>
                                            <Link
                                                href="#"
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 group ml-5"
                                            >
                                                <span className="text-gray-500 group-hover:text-gray-900">•</span>
                                                <span className="whitespace-nowrap"> Profile</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="#"
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 group ml-5"
                                            >
                                                <span className="text-gray-500 group-hover:text-gray-900">•</span>
                                                <span className="whitespace-nowrap"> All Users</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="#"
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 group ml-5"
                                            >
                                                <span className="text-gray-500 group-hover:text-gray-900">•</span>
                                                <span className="whitespace-nowrap"> All Admins</span>
                                            </Link>
                                        </li>
                                       
                                    </ul>
                                )}

                                
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}
