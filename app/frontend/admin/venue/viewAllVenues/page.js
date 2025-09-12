export const dynamic = "force-dynamic";
import React from 'react'
import MenuLayouts from '@/app/frontend/layouts/MenuLayouts'


import ViewAllVenuesComp from '../../components/viewAllVenuesComp';
import { getUserFromServer } from '@/app/hooks/getUserFromServer';
import { redirect } from 'next/navigation';
import { fetchWithRefresh } from '@/app/utils/serverInterceptor';
import { cookies } from 'next/headers';


const HandleVenues = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const user = await getUserFromServer()
    if (!user || user.role !== 'Admin') {
        redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/admin/login`
        )

    }

    let venues;


    // get all venues data 
    try {

        const res = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/getVenues`,
            {
                cache: 'no-store',
                method: "GET",
                headers: {
                    Cookie: `accessToken=${token}`, // manually bhejna padta hai
                },
            }

        )

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        venues = await res.json()

    } catch (error) {
        console.error("Failed to fetch bookings:", error.message);

    }

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