"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
import { FaVenus } from "react-icons/fa";

export default function Sidebar({ title }) {
  const [open, setOpen] = useState(false);
  const [venueOpen, setVenueOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);

  // logout function
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        alert("Logout successful");
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="flex justify-start items-center bg-black text-white text-[1.4rem] font-medium">
        <div className="w-[45%] p-2">
          <button
            onClick={() => setOpen(true)}
            className="font-medium rounded-lg text-sm px-5 py-2.5"
          >
            <FaBars />
          </button>
        </div>
        <div className="px-2">{title}</div>
      </div>

      {/* Sidebar (animate hoga) */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen  overflow-y-auto bg-black text-white transform transition-transform duration-700 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="bg-white p-[.85rem] text-black">
            <h5 className="text-base font-semibold uppercase">Menu</h5>
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-lg"
        >
          ✖
        </button>
        </div>

        <div className="py-4">
          <ul className="space-y-2 font-medium">
            {/* Dashboard */}
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 hover:text-black group"
              >
                <BiSolidDashboard
                  className="text-gray-500 group-hover:text-gray-900"
                  size={20}
                />
                <span>Dashboard</span>
              </Link>
            </li>

            {/* Venue with dropdown */}
            <li>
              <button
                onClick={() => setVenueOpen(!venueOpen)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 hover:text-black group"
              >
                <FaVenus
                  className="text-gray-500 group-hover:text-gray-900"
                  size={20}
                />
                <span>Venue</span>
              </button>
              <ul
                className={`pl-2 transition-all duration-300 ${
                  venueOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <li>
                  <Link
                    href={"/frontend/admin/venue/viewAllVenues"}
                    className="flex items-center gap-3 p-2 rounded-lg hover:text-black hover:bg-gray-100 group ml-5"
                  >
                    <span className="text-gray-500 group-hover:text-gray-900">
                      •
                    </span>
                    <span className="whitespace-nowrap">View All Venues</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/frontend/admin/venue/addNewVenue"}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 group ml-5"
                  >
                    <span className="text-gray-500 group-hover:text-gray-900">
                      •
                    </span>
                    <span className="whitespace-nowrap hover:text-black">Add New Venues</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 group ml-5"
                  >
                    <span className="text-gray-500 group-hover:text-gray-900">
                      •
                    </span>
                    <span className="whitespace-nowrap hover:text-black">Unbooked Venues</span>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Booking with dropdown */}
            <li>
              <button
                onClick={() => setBookingOpen(!bookingOpen)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 hover:text-black group"
              >
                <FaBookmark
                  className="text-gray-500 group-hover:text-gray-900"
                  size={20}
                />
                <span>Booking</span>
              </button>
              <ul
                className={`pl-2 transition-all duration-300 ${
                  bookingOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 group ml-5"
                  >
                    <span className="text-gray-500 group-hover:text-gray-900">
                      •
                    </span>
                    <span className="whitespace-nowrap hover:text-black">View All Bookings</span>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Settings */}
            <li>
              <button
                onClick={() => setSettingOpen(!settingOpen)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 hover:text-black group"
              >
                <IoMdSettings
                  className="text-gray-500 group-hover:text-gray-900"
                  size={20}
                />
                <span>Setting</span>
              </button>
              <ul
                className={`pl-2 transition-all duration-300 ${
                  settingOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 group ml-5"
                  >
                    <span className="text-gray-500 group-hover:text-gray-900">
                      •
                    </span>
                    <span className="whitespace-nowrap hover:text-black">Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 group ml-5"
                  >
                    <span className="text-gray-500 group-hover:text-gray-900">
                      •
                    </span>
                    <span className="whitespace-nowrap hover:text-black">All Users</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 group ml-5"
                  >
                    <span className="text-gray-500 group-hover:text-gray-900">
                      •
                    </span>
                    <span className="whitespace-nowrap hover:text-black">All Admins</span>
                  </Link>
                </li>
              </ul>
            </li>

            {/* logout button */}
            <li>
              <button
                onClick={handleLogout}
                className="w-full mt-[14rem] flex items-center gap-3 p-2 rounded-lg hover:bg-red-100 hover:text-black group"
              >
                <IoLogOut
                  className="text-gray-500 group-hover:text-gray-900"
                  size={20}
                />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
