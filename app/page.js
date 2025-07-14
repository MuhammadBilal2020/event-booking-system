import React from 'react'
import PublicUserLayout from './frontend/layouts/PublicUserLayout'
import VanuesComponent from './frontend/admin/components/venuescomp'
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const UserDashboard = async() => {
 const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  // if (!token) {
  //   redirect("/frontend/publicUser/loginUser");
  // }

  let user = null;

  try {
    user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    // redirect("/frontend/publicUser/loginUser");
  }

  const vanues = [
    {
      vanueId: "34665",
      vanueName: "Glits Banquet",
      location: "waterpump",
      description: "Venue description here...",
    },
  ];

  return (
    <>
    <PublicUserLayout title={"Dashboard"} user={user}>
      <VanuesComponent vanues ={vanues}/>
      

    </PublicUserLayout>
   
    </>
  )
}

export default UserDashboard