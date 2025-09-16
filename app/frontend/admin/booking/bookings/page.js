"use client"

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from 'react'
import MenuLayouts from '@/app/frontend/layouts/MenuLayouts.js'
import BookingsTable from '../../components/bookingTable.js';
import { fetchWithRefreshClient } from '@/app/utils/clientInterceptor.js';
import { useRouter } from 'next/navigation.js';



const Booking =  () => {
    const [user, setUser] = useState();
    const [bookings , setBookings] = useState(null)
    const router = useRouter();

  // const cookieStore = await cookies();
  // const token = cookieStore.get("accessToken")?.value; 
  // console.log(token);
  // const user = await getUserFromServer()

  // if (!user || user.role !== "Admin") {
  //   redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/admin/login`)
  // }


  useEffect(() => {
           (async () => {
             const res = await fetchWithRefreshClient("/api/auth/me", {}, "user");
             // console.log(res);
             
             if (res.ok) {
               const data = await res.json();
               // console.log(data);
               
               setUser(data);
             } else {
               setUser(null);
             }
           })();
         }, []);
       
         // console.log(user);
         useEffect(() => {
           if (user === undefined) return; // abhi loading hai
       
           if (!user || user.role !== "Admin") {
             router.push("/frontend/admin/login");
           }
         }, [user]);
         console.log(user);



  // get all bookings 
  useEffect(() =>{
(async () => {
  try {
    const res = await fetchWithRefreshClient(`${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/getBookings`,
      {
        method: "GET",
        credendials :"include",
        cache: 'no-store'
        
      }
    )
    console.log(res);
    
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

     const data = await res.json()
     setBookings(data)
     
    } catch (error) {
      console.error("Failed to fetch bookings:", error.message);
    }
    
  })()
} , [user])
console.log(bookings);
  



  return (
    <MenuLayouts title={"Bookings"}>
      <section className='pending-bookings py-3'>
        <h1 className='text-[1.5rem] font-semibold'>Bookings</h1>


      </section>
{bookings && <section className="booking-status pb-[3.5rem]">
        <BookingsTable bookingsFromServer={bookings.bookings} adminId={user.userId} />
      </section>}
      

    </MenuLayouts>
  )
}

export default Booking







{/* Dropdown menu */ }
// <div
//   id="dropdown"
//   className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
// >
//   <ul
//     className="py-2 text-sm text-gray-700 dark:text-gray-200"
//     aria-labelledby="dropdownDefaultButton"
//   >
//     <li>
//       <a
//         href="#"
//         className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//       >
//         Dashboard
//       </a>
//     </li>
//     <li>
//       <a
//         href="#"
//         className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//       >
//         Settings
//       </a>
//     </li>
//     <li>
//       <a
//         href="#"
//         className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//       >
//         Earnings
//       </a>
//     </li>
//     <li>
//       <a
//         href="#"
//         className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//       >
//         Sign out
//       </a>
//     </li>
//   </ul>
// </div>


