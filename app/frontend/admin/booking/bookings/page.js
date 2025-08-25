import React from 'react'

import PendingBookings from '../../components/pendingBookings.js'
import MenuLayouts from '@/app/frontend/layouts/MenuLayouts.js'
import { getUserFromServer } from '@/app/hooks/getUserFromServer.js'
import { redirect } from 'next/navigation.js'


const Booking = async () => {
  const user = await getUserFromServer()

  if(!user || user.role !== "Admin"){
    redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/admin/login`)
  }

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