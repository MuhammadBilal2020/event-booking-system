import React from 'react'
import VenueDetailComp from '../../components/venueDetailComp';
import { getUserFromServer } from '@/app/hooks/getUserFromServer';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';



const VanueDetail = async ({ params }) => {

  const { vanueId } = await params
  const cookieStore = await cookies();
      const token = cookieStore.get("accessToken")?.value;
  let venue;
  const user = await getUserFromServer()
  if (!user || user.role !== "publicUser") {
    console.log("for booking u need to login first")
    redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/publicUser/loginUser`);

  }
  console.log(vanueId);


  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/singleVenue/${vanueId}`, {
      cache: 'no-store',
      method: "GET",
      headers: {
        Cookie: `accessToken=${token}`, // manually bhejna padta hai
      },
    }); 

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    venue = await res.json()
    console.log(venue)

  } catch (error) {
    console.error("Failed to fetch bookings:", error.message);
  }




  return (
    <VenueDetailComp venue={venue} />
  )
}

export default VanueDetail