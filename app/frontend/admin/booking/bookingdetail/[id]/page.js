"use client"
import React, { useEffect, useState } from 'react'

import NoSidebarLayout from '@/app/frontend/layouts/nosidebarlayout'
import BookedDetailedComp from '../../../components/bookedDetailedComp'
import { useRouter } from 'next/navigation'
import { fetchWithRefreshClient } from '@/app/utils/clientInterceptor.js'


const BookingDetail =  ({ params }) => {
  // const { id } = await params
  const router = useRouter();
    const [user, setUser] = useState();
    const [bookings , setBookings] = useState(null)
  const { id } = React.use(params);
  console.log(id);
  // const cookieStore = await cookies();
  // const token = cookieStore.get("accessToken")?.value;
  
  // const user = await getUserFromServer()
  

  // if (!user || user.role !== 'Admin') {
  //   redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/admin/login`
  //   )

  // }
  // let booking1;
  useEffect(() => {
        (async () => {
          const res = await fetchWithRefreshClient("/api/auth/me", {}, "user");
          // console.log(res);
          
          if (res.ok) {
            const data = await res.json();
            // console.log(data);
            
            setUser(data);
            console.log(data);
            
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

  // get single booking detail  
  useEffect(() => {
    if(!user ) return;
(async () => {
 try {
    const res = await fetchWithRefreshClient(`${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/getSingleBookings/${id}`,
      {
        cache: 'no-store',
        method: "GET",
       credentials: "include",
      }
    )

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json()
    setBookings(data)
    // console.log(bookings);
  } catch (error) {
    console.error("Failed to fetch bookings:", error.message);
  }
})()
  } ,[user])
 
console.log(bookings);




  // const booking = {
  //   id: "1",
  //   event: "Shadi",
  //   bookingDate: "12/4/2025",
  //   timing: "9:00pm",
  //   guest: "500",
  //   bookerName: "Bilal",
  //   bookerPhone: "035638296589"
  // }

  // const booker = {
  //   id: "383429329",
  //   bookerName: "Bilal",
  //   bookerPhone: "035638296589",
  //   email: "zyx@gmail.com"
  // }

  return (
   <NoSidebarLayout title={"Booking Detial"}>
    {user && bookings ? (
      <BookedDetailedComp booking={bookings} adminId={user.userId} />
    ) : (
      <div className="flex items-center gap-2 justify-center min-h-screen bg-white">
            loading

            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )}
  </NoSidebarLayout>
  )
}

export default BookingDetail