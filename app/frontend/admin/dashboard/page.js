import React from 'react'
import PendingBookings from '../components/pendingBookings'
import MenuLayouts from '../../layouts/MenuLayouts'

const AdminDashboard = () => {
  
  return (

    <>  
    <MenuLayouts title={"Admin Dashboard"}>
 <section className='pending-bookings py-3 px-[2rem]'>
      <h1 className='text-[1.5rem] font-semibold'>Pending Bookings</h1>
      <div className='shadow-sm h-[10rem] bg-[#f2efef] mt-3 p-4 rounded'>
        <PendingBookings/>
      </div>

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



