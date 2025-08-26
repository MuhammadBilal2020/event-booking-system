import React from 'react'
import VenueDetailComp from '../../components/venueDetailComp';
import { getUserFromServer } from '@/app/hooks/getUserFromServer';
import { redirect } from 'next/navigation';



const VanueDetail = async ({ params }) => {

  const { vanueId } = await params
  const user = await getUserFromServer()
  if (!user || user.role !== "publicUser") {
    console.log("for booking u need to login first")
    redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/publicUser/loginUser`);

  }
  console.log(vanueId);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/singleVenue/${vanueId}`, {
    cache: 'no-store'
  });

  const venue = await res.json()
  console.log(venue)



  return (
    <VenueDetailComp venue={venue} />
  )
}

export default VanueDetail