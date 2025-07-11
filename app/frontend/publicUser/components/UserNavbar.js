// app/components/Navbar.jsx
"use client";
import { useState } from "react";
import Link from "next/link";

export default function UserNavbar({ user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-md">
      {/* Left Side */}
      <div className="text-lg font-semibold text-blue-600">
        {user ? (
          <span>{user.name}</span>
        ) : (
          <Link href="/dashboard">Dashboard</Link>
        )}
      </div>

      {/* Right Side */}
      <div className="relative">
        {user ? (
          <div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center focus:outline-none"
            >
              <span className="text-xl">👤</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    // logout logic here
                    console.log("Logged out");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
