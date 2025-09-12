export const dynamic = "force-dynamic";
import React from 'react'


import MenuLayouts from '@/app/frontend/layouts/MenuLayouts.js'
import { getUserFromServer } from '@/app/hooks/getUserFromServer.js'
import { redirect } from 'next/navigation.js'
import { fetchWithRefresh } from '@/app/utils/serverInterceptor.js';
import BookingsTable from '../../components/bookingTable.js';
import { cookies } from 'next/headers.js';



const Booking = async () => {

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  console.log(token);
  const user = await getUserFromServer()

  if (!user || user.role !== "Admin") {
    redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/admin/login`)
  }
  let Bookings;

  // alag bg colors



  // get all bookings 
  try {
    const res = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/getBookings`,
      {
        cache: 'no-store',
        method: "GET",
        headers: {
          Cookie: `accessToken=${token}`, // manually bhejna padta hai
        },
      }
    )
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

     Bookings = await res.json()
    console.log(Bookings);

  } catch (error) {
    console.error("Failed to fetch bookings:", error.message);
  }



  return (
    <MenuLayouts title={"Bookings"}>
      <section className='pending-bookings py-3'>
        <h1 className='text-[1.5rem] font-semibold'>Bookings</h1>


      </section>

      <section className="booking-status pb-[3.5rem]">
        <BookingsTable bookingsFromServer={Bookings} adminId={user.userId} />
      </section>

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


