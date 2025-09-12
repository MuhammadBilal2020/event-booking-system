export const dynamic = "force-dynamic";
import React, { cache } from 'react'
import MenuLayouts from '../../layouts/MenuLayouts'
import { getUserFromServer } from '@/app/hooks/getUserFromServer'
import { redirect } from 'next/navigation'
import { fetchWithRefresh } from '@/app/utils/serverInterceptor'
import { cookies } from 'next/headers'
import { Badge } from '@/components/ui/badge';
import { Merienda } from "next/font/google"
import { IoFilter } from "react-icons/io5";
import PendingBookingsTable from '../components/pendingBookingTable';

const meriendaFont = Merienda({
  subsets: ['latin'],
  weight: "700",
});

 
const AdminDashboard = async () => {
  let bookings = [
    
  ]
  let cardData;
// send cookies with every request 
  const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    console.log(token);
    


    // get user from cookies 
   const user = await getUserFromServer()
  // console.log(user);

  if (!user || user.role !== 'Admin') {
    redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/admin/login`
    )

  }

    
    // get pending bookings 
    try {

      const res = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/getPendingBookings` ,
     {
            cache: 'no-store',
            mothod : "GET",
            headers: {
      Cookie: `accessToken=${token}`, // manually bhejna padta hai
    },
            
        }
     
  )
   if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

  const getPendings = await res.json();
  console.log(getPendings);
  
bookings = getPendings.bookings || []; // yahan array mil gya
      
    } catch (error) {
    console.error("Failed to fetch bookings:", error.message);
      
    }
  
  
 

// get cards data 

try {
  const res3 = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/api/special/getDashboardCards` , {
    method:"GET",
  cache : 'no-store',
    headers: {
      Cookie: `accessToken=${token}`, // manually bhejna padta hai
    },
})

if (!res3.ok) {
      throw new Error(`HTTP error! Status: ${res3.status}`);
    }

 cardData = await res3.json()
console.log(cardData);
} catch (error) {
  console.error("Failed to fetch bookings:", error.message);
}





 

  return (

    <>
      <MenuLayouts title={"Admin Dashboard"}>
        <section className='cards py-3 px-[2rem]'>
          {/* <h1 className='text-[1.5rem] font-semibold'>Pending Bookings</h1>
      <div className='shadow-sm h-[10rem] bg-[#f2efef] mt-3 p-4 rounded'>
        <PendingBookings/>
      </div> */}
          <div className='grid grid-cols-4 gap-[2rem]  '>

            {/* today booking  */}
            <div className='today-booking card py-5 px-[1.5rem]  font-semibold rounded  bg-[#f4f4f4] '>
              <div className='flex justify-between items-center'>
                <p className={` text-[.8rem] font-semibold text-[#3b3b3b]`}>Today's Bookings</p>
                <p className='flex justify-between gap-2 items-center'>
                  <button><IoFilter size={20} /></button>
                  {/* <Badge className="bg-[#5f5e5e] text-white" variant="outline">4</Badge> */}
                </p>
              </div>

              <p className='text-[2.3rem] mt-3'>{cardData.todayBookings}</p>
            </div>

            {/* New Bookings Today */}

            <div className='today-booking py-5 card px-[1.5rem]  font-semibold rounded  bg-[#f4f4f4] '>
              <div className='flex justify-between items-center'>
                <p className={` text-[.8rem] font-semibold text-[#3b3b3b]`}>New Bookings</p>
                <p className='flex justify-between gap-2 items-center'>
                  <button><IoFilter size={20} /></button>
                  {/* <Badge className="bg-[#5f5e5e] text-white" variant="outline">4</Badge> */}
                </p>
              </div>

              <p className='text-[2.3rem] mt-3'>{cardData.newBookings}</p>
              <button className=' text-blue-400 ms-auto block'>View</button>
            </div>

            <div className='today-booking card py-5 px-[1.5rem]  font-semibold rounded  bg-[#f4f4f4] '>
              <div className='flex justify-between items-center'>
                <p className={` text-[.8rem] font-semibold text-[#3b3b3b]`}>Pending Requests</p>
                <p className='flex justify-between gap-2 items-center'>
                  <button><IoFilter size={20} /></button>
                  {/* <Badge className="bg-[#5f5e5e] text-white" variant="outline">4</Badge> */}
                </p>
              </div>

              <p className='text-[2.3rem] mt-3'>{cardData.pendingRequests}</p>
              <button className=' text-blue-400 ms-auto block'>View</button>
            </div>


            {/* <div className='top-book-venues flex items-center  justify-center'>

              <p className={`${meriendaFont.className} text-[1.3rem] font-semibold`}>Top Book Venues </p>
              <p></p>


            </div> */}

            {/* available vanues for today  */}
            <div className='today-booking card py-5 px-[1.5rem]  font-semibold rounded  bg-[#f4f4f4] '>
              <div className='flex justify-between items-center'>
                <p className={` text-[.8rem] text-[#3b3b3b]`}>Available Venues</p>
                <p className='flex justify-between gap-2 items-center'>
                  <button><IoFilter size={20} /></button>
                  {/* <Badge className="bg-[#5f5e5e] text-white" variant="outline">4</Badge> */}
                </p>
              </div>

              <p className='text-[2.3rem] mt-3'>{cardData.availableVenues}</p>
              <button className=' text-blue-400 ms-auto block'>View</button>
            </div>
          </div>



        </section>

        {/* <section className='booking-status  pb-[3.5rem] px-[2rem]'>
          <div className="relative overflow-x-auto  sm:rounded-lg">
            <table className="w-full border-separate border-spacing-y-2 text-sm text-left rtl:text-right ">
              <caption className="pt-5 pb-3 text-lg font-semibold text-left rtl:text-right text-gray-900  dark:text-white dark:bg-gray-800">
                Pending Requests

              </caption>
              <thead className=" ">
                <tr className='bg-[#3a3a3a]  text-white'>
                  <th scope="col" className="px-6 py-3">
                    Booking Venue
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Booking Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Booker
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>

                {bookings ? bookings.map((booking ,i) => {
                  return (
                  
                    <tr key={i} className="bg-[#e0dfdf]  radius-2" >
                      <td
                        scope="row"
                        className="px-6 py-4 radius-l font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {booking.venueId.venueName}
                      </td>
                      <td className="px-6 py-4 ">{new Date(booking.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">{booking.userId.name}</td>
                      <td className="px-6 py-4 "><span className='bg-[red] px-[.6rem] pt-[.2rem] radius-1 pb-[.25rem]'>
                        {booking.bookingStatus}
                        </span></td>
                      <td className=" py-4 radius-r flex gap-3 justify-center  ">
                        <button className='bg-[#129e12] text-white block w-[6rem] p-2'>Accept</button>
                        <button className='bg-[blue] text-white block w-[6rem] p-2'>Reject</button>

                      </td>
                    </tr> 
                   
                   

                  )
                }) : <h1>No bookings</h1>}


              </tbody>
            </table>
          </div>


        </section> */}
 <section className="booking-status pb-[3.5rem] px-[2rem]">
        <PendingBookingsTable bookingsFromServer={bookings} token={token} adminId={user.userId} />
      </section>
        
      </MenuLayouts>


    </>


  )
}

export default AdminDashboard



// 2. Admin Dashboard (Protected Route)
// Page: /admin/dashboard

// Show all events

// Buttons: Add / Edit / Delete


// 4. Edit/Delete Event
// Edit → fetch existing data → update on submit

// Delete → DELETE /api/event/:id








 //  const cookieStore = await cookies();
  //   const token = cookieStore.get("accessToken")?.value;
  //   console.log(token);
  //   let user;
  //   // get user from server 
  //    const res = await fetchWithRefresh("/api/auth/me", {
  //       headers: {
  //         Cookie: `accessToken=${token}`, // manually bhejna padta hai
  //       },
  //     });

  //     if (!res.ok) {
  //       console.log("Unauthorized or invalid response");
  //     } else {
  //        user = await res.json();
  //       console.log(user);
  //     }



