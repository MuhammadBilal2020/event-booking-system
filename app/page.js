import React from 'react'
import PublicUserLayout from './frontend/layouts/PublicUserLayout'
import { fetchWithRefresh } from './utils/serverInterceptor.js';
import { cookies } from 'next/headers';
import VanuesComponent from './frontend/publicUser/components/venuescomp';


const UserDashboard = async () => {

  // const user = getUserFromServer()
  // console.log(user);
  
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  console.log(token);
  let user;

   const res = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
    headers: {
      Cookie: `accessToken=${token}`, // manually bhejna padta hai
    },
  });

  if (!res.ok) {
    console.log("Unauthorized or invalid response");
  } else {
     user = await res.json();
    console.log(user);
  }



  const res2 = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/getVenues`, {
    method: "GET",
    credentials: "include"
  })
  const venues = await res2.json();
  console.log(venues);



  

  return (
    <>
      <PublicUserLayout title={"Dashboard"} user ={user} >
        <VanuesComponent venues={venues} />


      </PublicUserLayout>

    </>
  )
}

export default UserDashboard