export const dynamic = "force-dynamic"; 
import React from 'react'
import PendingBookings from '../components/pendingBookings'
import MenuLayouts from '../../layouts/MenuLayouts'
import { getUserFromServer } from '@/app/hooks/getUserFromServer'
import { redirect } from 'next/navigation'
import { fetchWithRefresh } from '@/app/utils/serverInterceptor'
import { cookies } from 'next/headers'

const AdminDashboard = async () => {
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



    const user = await getUserFromServer()
    console.log(user);
    
    if(!user || user.role !== 'Admin'){
      redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/admin/login`
  )
      
    }

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



