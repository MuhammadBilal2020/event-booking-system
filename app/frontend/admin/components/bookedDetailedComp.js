"use client"
import React, { useEffect, useState } from 'react'

const BookedDetailedComp = ({booker , booking}) => {
    // const [bookedBy , setBookedBy] = useState([])
    // const [bookingDetail , setBookingDetial] = useState([])

//  useEffect(() => {
// setBookedBy(booker)
// setBookingDetial(booking)
//  } , [])

  return (
    
    <>
     <h1 className='text-[1.4rem] font-semibold'>Booking Detail</h1>
    <section className='booking-detail p-3 mt-4 shadow-sm'>
       {
        booking ? 
        <div>
            <p className='font-medium text-[1.2rem]'>{booking.event}</p>
            <p className=''>{booking.bookingDate}</p>
            <p className=''>{booking.timing}</p>
            <p className=''>{booking.guest}</p>

            
            

            
        </div>
        
        :
        <h1>error</h1>
       }


       
    </section>

    
        <h1 className='text-[1.4rem] font-semibold mt-4'>Booker Detail</h1>
    <section className='booking-detail p-3 mt-4 shadow-sm'>
       {
        booker ? 
        <div>
            <p className='font-medium text-[1.2rem]'>{booker.bookerName}</p>
            <p>{booker.email}</p>
            <p>{booker.bookerPhone}</p>

            
        </div>
        
        :
        <h1>error</h1>
       }


       
    </section>
    </>
  )
}

export default BookedDetailedComp