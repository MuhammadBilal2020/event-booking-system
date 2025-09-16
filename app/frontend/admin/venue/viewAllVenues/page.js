"use client"

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from 'react'
import MenuLayouts from '@/app/frontend/layouts/MenuLayouts'
import ViewAllVenuesComp from '../../components/viewAllVenuesComp';
import {  useRouter } from 'next/navigation';
import { fetchWithRefreshClient } from '@/app/utils/clientInterceptor.js';


const HandleVenues =  () => {
    const router = useRouter();
    const [user, setUser] = useState();
        const [venues, setVenues] = useState(null); // 👈 state for venue
    
    // const cookieStore = await cookies();
    // const token = cookieStore.get("accessToken")?.value;
    // console.log(token);

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
    
    // const user = await getUserFromServer()
    // if (!user || user.role !== 'Admin') {
    //     redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/admin/login`
    //     )

    // }

    // let venues;


    // get all venues data 
    useEffect( ()  => {
        (async () => {
              try {

        const res = await fetchWithRefreshClient(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/getVenues`,
            {
                method: "GET",
                credendials :"include",
                cache: 'no-store',
            }

        )

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json()
        setVenues(data)

    } catch (error) {
        console.error("Failed to fetch bookings:", error.message);

    }
        })()

    },[user])
  

    // console.log(venues)

    return (
        <>
            <MenuLayouts title={"Handle Venues"}>
                <ViewAllVenuesComp venues={venues} />

            </MenuLayouts>
        </>
    )
}

export default HandleVenues