"use client";

import { useState } from "react";
import Link from "next/link";
import PublicUserLayout from "../../layouts/PublicUserLayout";
import { useRouter } from "next/navigation";

export default function LoginUser() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",

  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch('/api/user/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      })

      const data = await res.json();

       if (res.ok) {
      alert("Login successful");
      // Navigate to dashboard or admin panel
      router.push("/") 
    } else {
      alert(data.message || "Login failed");
    }

    }
    catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }





  };

  return (
    <PublicUserLayout title={"Login"}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700"> Login</h2>

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



          <p className="text-[gray] mb-6 text-[.9rem] text-center">Dont have an account?

            <Link className=" text-[#155dfc]" href={"/frontend/publicUser/registerUser"}> Create an account first</Link>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-200"
          >
            Login
          </button>
        </form>

      </div>
    </PublicUserLayout>
  );
}
