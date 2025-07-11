"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

const NoSidebarNav = ({title}) => {
    const router = useRouter();

    return (
        <nav className="flex justify-between items-center p-4 bg-blue-500 text-white">
            <h1 className="text-xl font-bold">{title}</h1>
            <button
                onClick={() => router.back()} // 👈 previous page par le jaata hai
                className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100"
            >
                Go Back
            </button>
        </nav>
    );
}

export default NoSidebarNav