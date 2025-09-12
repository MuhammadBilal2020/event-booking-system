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
  let venues;


  // get user 
  try {
    const res = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
      headers: {
        Cookie: `accessToken=${token}`, // manually bhejna padta hai
      },
    });

    if (!res.ok) {
      // Handle HTTP errors (e.g., 404, 500)
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    user = await res.json();
    console.log(user);


  } catch (error) {
    console.error("Failed to fetch bookings:", error.message);
  }


  // if (!res.ok) {
  //   console.log("Unauthorized or invalid response");
  // } else {
  //    user = await res.json();
  //   console.log(user);
  // }


  // get venues 
  try {

    const res2 = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/forPublicUser/forUserGetVenues`, {
      cache: 'no-store',
      method: "GET",
      headers: {
        Cookie: `accessToken=${token}`, // manually bhejna padta hai
      },




    })
    if (!res2.ok) {
      throw new Error(`HTTP error! Status: ${res2.status}`);
    }

    venues = await res2.json();
    console.log(venues);



  } catch (error) {
    console.error("Failed to fetch bookings:", error.message);
  }








  return (
    <>
      <PublicUserLayout title={"Dashboard"} user={user} >
        <VanuesComponent venues={venues} />


      </PublicUserLayout>

    </>
  )
}

export default UserDashboard