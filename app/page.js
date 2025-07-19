import React from 'react'
import PublicUserLayout from './frontend/layouts/PublicUserLayout'
import VanuesComponent from './frontend/admin/components/venuescomp'
import { getUserFromServer } from './hooks/getUserFromServer';

const UserDashboard = async() => {
 const user = await getUserFromServer();
  //  console.log(user);

 const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/getVenues`, {
  cache: 'no-store'
});

const venues = await res.json(); // ✅ Ye lazmi karo warna data parse nahi hoga
console.log(venues);

  // const vanues = [
  //   {
  //     vanueId: "34665",
  //     vanueName: "Glits Banquet",
  //     location: "waterpump",
  //     description: "Venue description here...",
  //   },
  // ];

  return (
    <>
    <PublicUserLayout title={"Dashboard"} user={user}>
      <VanuesComponent vanues ={venues}/>
      

    </PublicUserLayout>
   
    </>
  )
}

export default UserDashboard