"use client"

import React, { useEffect, useState } from 'react';
import NoSidebarLayout from '@/app/frontend/layouts/nosidebarlayout';
import EditVenueComp from '../../../components/editVenueComp';
import { fetchWithRefreshClient } from '@/app/utils/clientInterceptor.js';
import { useRouter } from 'next/navigation';

const EditVenue =  ({ params }) => {
  const [venue, setVenue] = useState(null); // 👈 state for venue
  const router = useRouter();
  const [user, setUser] = useState();
const { editId } = React.use(params);
console.log(editId);


  // let eid;

  // (async () => {

  //   const { editId } = await params;
  //   eid = editId
  // })
  // const cookieStore = await cookies();
  // const token = cookieStore.get("accessToken")?.value;
  // const user = await getUserFromServer()

  useEffect(() => {
      (async () => {
        const res = await fetchWithRefreshClient("/api/auth/me", {}, "user");
        // console.log(res);
        
        if (res.ok) {
          const data = await res.json();
          // console.log(data);
          
          setUser(data);
        } else {
          setUser(null);
        }
      })();
    }, []);
  
    // console.log(user);
    useEffect(() => {
      if (user === undefined) return; // abhi loading hai
  
      if (!user || user.role !== "Admin") {
        router.push("/frontend/admin/login");
      }
    }, [user]);
    console.log(user);
    




  // ✅get single venue
  useEffect(() => {
if(!user) return;
(async () => {
  try {
    const res = await fetchWithRefreshClient(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/singleVenue/${editId}`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });
    console.log(res);
    
    
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await  res.json();
    setVenue(data)
      
  } catch (error) {
    console.error("Failed to fetch bookings:", error.message);

  }
})()
  },[user])
  console.log(venue);
  
  

  // try {
  //   const res = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/singleVenue/${editId}`, {
  //     method: "GET",
  //     credentials: "include",
  //     cache: "no-store",
  //   });
  //   if (!res.ok) {
  //     throw new Error(`HTTP error! Status: ${res.status}`);
  //   }
  //   venue = await res.json();
  //   console.log(venue);
  // } catch (error) {
  //   console.error("Failed to fetch bookings:", error.message);

  // }



  return (
     <NoSidebarLayout>
      {user && venue ? (
        <EditVenueComp venue={venue} editId={editId} />
      ) : (
        <p>Loading...</p>
      )}
    </NoSidebarLayout>
  );
};

export default EditVenue;
