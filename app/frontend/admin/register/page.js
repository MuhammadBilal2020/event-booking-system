"use client";

import { useState } from "react";
import NoSidebarLayout from "../../layouts/nosidebarlayout";
import Link from "next/link";

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

    const res = await fetch('/api/user/auth/signup', {
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
      alert("Signup successful");
      // redirect logic here if needed
    } else {
      alert(data.message);
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
          <div className="mb-4">
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
          </div>


          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={formData.email}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={formData.password}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
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
          </div>

          <p className="text-[gray] mb-6 text-[.9rem] text-center">Already have an account?

            <Link className=" text-[#155dfc]" href={"/frontend/admin/login"}> Go and login</Link>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-200"
          >
            Register
          </button>


        </form>

      </div>
    </NoSidebarLayout>
  );
}
