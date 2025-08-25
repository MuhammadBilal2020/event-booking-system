"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoReturnDownBack } from "react-icons/io5";

const NoSidebarNav = ({title}) => {
    const router = useRouter();

    return (
        <nav className="flex justify-between items-center p-3 bg-black text-white">
            <h1 className="text-xl font-bold">{title}</h1>
            <button
                onClick={() => router.back()} // 👈 previous page par le jaata hai
                className=" text-white px-4 py-2 rounded hover:text-[#575656]"
            >
                <IoReturnDownBack  size={30} />
            </button>
        </nav>
    );
}

export default NoSidebarNav