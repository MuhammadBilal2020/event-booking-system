import React from 'react'

import NoSidebarLayout from '@/app/frontend/layouts/nosidebarlayout'
import BookedDetailedComp from '../../../components/bookedDetailedComp'
import { fetchWithRefresh } from '@/app/utils/serverInterceptor'
import { getUserFromServer } from '@/app/hooks/getUserFromServer'
import { cookies } from 'next/headers'

const BookingDetail = async ({ params }) => {
  const { id } = await params
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  // console.log(id);
  const user = await getUserFromServer()
  // console.log(user);

  if (!user || user.role !== 'Admin') {
    redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/admin/login`
    )

  }
  let booking1;

  // get single booking detail  
  try {
    const res = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/getSingleBookings/${id}`,
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

    booking1 = await res.json()
    console.log(booking1);
  } catch (error) {
    console.error("Failed to fetch bookings:", error.message);
  }




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
      <BookedDetailedComp booking={booking1} adminId={user.userId} />
    </NoSidebarLayout>
  )
}

export default BookingDetail