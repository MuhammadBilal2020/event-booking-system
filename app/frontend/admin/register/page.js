"use client";

import { useState } from "react";
import NoSidebarLayout from "../../layouts/nosidebarlayout";
import Link from "next/link";
import SubmitButton from "@/app/components/Button";
import { toast } from "sonner";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    adminSecret: "",
    role: "Admin"
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,               // "admin"
        adminSecret: formData.adminSecret, // for secret check
      }),
    });

    const data = await res.json();
    if (res.ok) {
      // alert("Signup successful");
      toast.success("Signup Successful" , {
        style : {
          color :"white",
          background : "green"
        }
      })
      // redirect logic here if needed
    } else {
      alert(data.message);
        toast.error(`Error: ${data.message}`, {
                      style: {
                          background: "red",
                          color: "white",
                      },
                  });
    }
  };

  return (
    <NoSidebarLayout title={"Register"}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Admin Signup</h2>
          {/* username  */}
          {/* <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-1">
              Username
            </label>
            <input
              type="username"
              name="username"
              id="username"
              onChange={handleChange}
              value={formData.username}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div> */}
 <div className="relative mb-6">
            <input
              type="username"
              id="username"
              name="username"
              aria-describedby="outlined_success_help"
              className="block px-2 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-[#e8e8e8] appearance-none dark:text-white dark:border-[black] focus:[black] focus:outline-none focus:ring-0 focus:border-[#b1b1b1] peer"
              placeholder=" "
              onChange={handleChange}
              value={formData.username}
              required
            />
            <label
              htmlFor="username"
              className="absolute text-sm text-[gray] dark:text-[#d4d2d2] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Username
            </label>
          </div>
          



          <div className="relative mb-6">
            <input
              type="email"
              id="email"
              name="email"
              aria-describedby="outlined_success_help"
              className="block px-2 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-[#e8e8e8] appearance-none dark:text-white dark:border-[black] focus:[black] focus:outline-none focus:ring-0 focus:border-[#b1b1b1] peer"
              placeholder=" "
              onChange={handleChange}
              value={formData.email}
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-[gray] dark:text-[#d4d2d2] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Email
            </label>
          </div>



          <div className="relative mb-6">
            <input
              type="password"
              id="password"
              name="password"
              aria-describedby="outlined_success_help"
              className="block px-2 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-[#e8e8e8] appearance-none dark:text-white dark:border-[black] focus:[black] focus:outline-none focus:ring-0 focus:border-[#b1b1b1] peer"
              placeholder=" "
              onChange={handleChange}
              value={formData.password}
              required
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-[gray] dark:text-[#d4d2d2] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Password
            </label>
          </div>


{/* admin secret  */}
          {/* <div className="mb-6">
            <label htmlFor="adminPassword" className="block text-gray-600 mb-1">
              Admin Password
            </label>
            <input
              type="password"
              name="adminSecret" // ✅ So handleChange works correctly
              id="adminPassword"
              onChange={handleChange}
              value={formData.adminSecret}
              
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div> */}

           <div className="relative mb-6">
            <input
              type="password"
              name="adminSecret"
              id="adminPassword"
              aria-describedby="outlined_success_help"
              className="block px-2 pb-2 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-[#e8e8e8] appearance-none dark:text-white dark:border-[black] focus:[black] focus:outline-none focus:ring-0 focus:border-[#b1b1b1] peer"
              placeholder=" "
              onChange={handleChange}
              value={formData.adminSecret}
              required
            />
            <label
              htmlFor="adminPassword"
              className="absolute text-sm text-[gray] dark:text-[#d4d2d2] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Admin Password
            </label>
          </div>

          <p className="text-[gray] mb-6 text-[.9rem] text-center">Already have an account?

            <Link className=" text-[black]" href={"/frontend/admin/login"}> Go and login</Link>
          </p>

          <SubmitButton title={"Register"}/>


        </form>

      </div>
    </NoSidebarLayout>
  );
}
