import React from 'react'
import MenuLayouts from '@/app/frontend/layouts/MenuLayouts'


import ViewAllVenuesComp from '../../components/viewAllVenuesComp';
import { getUserFromServer } from '@/app/hooks/getUserFromServer';
import { redirect } from 'next/navigation';
import { fetchWithRefresh } from '@/app/utils/serverInterceptor';


const HandleVenues = async () => {

    const user = await getUserFromServer()
if(!user || user.role !== 'Admin'){
      redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/admin/login`
  )
      
    }

    const res = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/getVenues`,
        {
            cache: 'no-store'
        }

    )

    const venues = await res.json()
    // console.log(venues)

    return (
        <>
            <MenuLayouts title={"Handle Venues"}>
               <ViewAllVenuesComp venues = {venues}/>

            </MenuLayouts>
        </>
    )
}

export default HandleVenues