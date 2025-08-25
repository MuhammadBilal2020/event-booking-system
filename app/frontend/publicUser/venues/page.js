export const dynamic = "force-dynamic"; 
import React from 'react'
import MenuLayouts from '../../layouts/MenuLayouts'
import VanuesComponent from '../components/venuescomp'
import { getUserFromServer } from '@/app/hooks/getUserFromServer'
import { redirect } from 'next/navigation'
import { fetchWithRefresh } from '@/app/utils/serverInterceptor'
import PublicUserLayout from '../../layouts/PublicUserLayout'

const Venues = async () => {
  const user = await getUserFromServer()
  console.log(user);

 

  // const cookieStore = await cookies();
  // const token = cookieStore.get("accessToken")?.value;
  // console.log(token);
  // let user;

  // const response = await fetchWithRefresh("http://localhost:3000/api/auth/me", {
  //   headers: {
  //     Cookie: `accessToken=${token}`, // manually bhejna padta hai
  //   },
  // });

  // if (!response.ok) {
  //   console.log("Unauthorized or invalid response");
  // } else {
  //   user = await response.json();
  //   console.log(user);
  // }


  if (!user || user.role !== "publicUser") {
    redirect("http://localhost:3000/frontend/publicUser/loginUser")
  }
  const res = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/getVenues`, {
    cache: 'no-store'
  });

  const venues = await res.json()
  console.log(venues)




  return (
    <PublicUserLayout title={"Venues"} user = {user}>
      <VanuesComponent venues={venues} />

    </PublicUserLayout>
  )
}

export default Venues