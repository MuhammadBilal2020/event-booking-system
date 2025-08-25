"use client";

import { useState } from "react";
import Link from "next/link";
import PublicUserLayout from "../../layouts/PublicUserLayout";
import { useRouter } from "next/navigation";
import NoSidebarLayout from "../../layouts/nosidebarlayout";



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

      const res = await fetch('/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: "publicUser", // ✅ add this
        })
      }
      )

      console.log(res);


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
    <NoSidebarLayout title={"Login"}>
      
      <div className="mt-[3rem] flex items-center justify-center ">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md  max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700"> Login</h2>

          {/* <div className="mb-4">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[black] "
            />
          </div> */}

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

          {/* <div className="mb-4">
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
          </div> */}

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



          <p className="text-[gray] mb-6 text-[.9rem] text-center">Dont have an account?

            <Link className=" text-[black]" href={"/frontend/publicUser/registerUser"}> Create an account first</Link>
          </p>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-semibold 
             border-b-[1px] border-transparent 
             hover:bg-white hover:text-black hover:border-black 
             transition duration-200"
          >
            Sign in
          </button>


        </form>

      </div>
    </NoSidebarLayout>
  );
}
