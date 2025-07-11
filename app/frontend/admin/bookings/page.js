import React from 'react'
import MenuLayouts from '../../layouts/MenuLayouts.js'
import PendingBookings from '../components/pendingBookings.js'

const Booking = () => {
  return (
   <MenuLayouts>
    <section className='pending-bookings py-3 px-[2rem]'>
      <h1 className='text-[1.5rem] font-semibold'>Bookings</h1>
      <div className='shadow-sm h-[10rem] bg-[#f2efef] mt-3 p-4 rounded'>
        <PendingBookings/>
      </div>

    </section>

   </MenuLayouts>
  )
}

export default Booking