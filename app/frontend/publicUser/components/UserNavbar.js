// app/components/Navbar.jsx
"use client";
import { useState } from "react";
import Link from "next/link";

export default function UserNavbar({ user, title }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  console.log(user);
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        alert("Logout successful");
        window.location.reload(); // 🔁 Refresh to clear user from client
        // router.push("/frontend/publicUser/loginUser"); // or homepage
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };


  return (
    <nav className="  text-white flex justify-between items-center shadow-md">
      {/* Left Side */}
      <div className=" w-[30%] p-4   text-lg font-semibold">
        {user ? (
          <span className="text-[black] text-[1.5rem]">{user.name}</span>
        ) : (
          <Link href="/dashboard" className="text-[black] text-[1.5rem]">{title}</Link>
        )}
      </div>

      {/* Right Side */}
      <div className="relative  w-[50%] p-[.9rem] curve-border bg-black">
        {user ? (
          <div className="">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ms-auto  focus:outline-none"
            >
              <span className="text-xl">👤</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 text-black mt-2 w-40 bg-white border rounded shadow">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={handleLogout}  // ✅ call the actual function
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        ) : (
          <Link
            href="/frontend/publicUser/loginUser"
            className="ms-auto block w-[6rem] text-center font-semibold text-[#e0e0e0] px-4 py-2 rounded hover:bg-[#ffffffeb] hover:text-[black]"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
