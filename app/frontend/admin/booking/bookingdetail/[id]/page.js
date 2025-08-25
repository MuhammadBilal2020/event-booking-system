import React from 'react'

import NoSidebarLayout from '@/app/frontend/layouts/nosidebarlayout'
import BookedDetailedComp from '../../../components/bookedDetailedComp'

const BookingDetail = async ({ params }) => {
  const {id} = await params

  const booking = {
    id: "1",
    event: "Shadi",
    bookingDate: "12/4/2025",
    timing: "9:00pm",
    guest: "500",
    bookerName: "Bilal",
    bookerPhone: "035638296589"
  }

  const booker = {
    id: "383429329",
    bookerName: "Bilal",
    bookerPhone: "035638296589",
    email: "zyx@gmail.com"
  }

  return (
    <NoSidebarLayout title={"Booking Detial"}>
      <BookedDetailedComp booker={booker} booking={booking} />
    </NoSidebarLayout>
  )
}

export default BookingDetail