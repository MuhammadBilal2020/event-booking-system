import React from 'react'
import { getUserFromServer } from '@/app/hooks/getUserFromServer'
import { Merienda } from 'next/font/google';
import { IoPersonSharp } from 'react-icons/io5';
import NoSidebarLayout from '@/app/frontend/layouts/nosidebarlayout';
import { fetchWithRefresh } from '@/app/utils/serverInterceptor';
import ProfileBookingTable from '../../components/profileBookingTable';
import { cookies } from 'next/headers';

const meriendaFont = Merienda({
    subsets: ['latin'],
    weight: "700",
});

const UserProfile = async ({ params }) => {
const { profileId } = await params

const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    // console.log(token);

    let bookings;
    // console.log(profileId);
    const user = await getUserFromServer()
    // console.log(user);

    // const cookieStore = await cookies();
    // const token = cookieStore.get("accessToken")?.value;
    // console.log(token);


    // fetch user past bookings

    // const res = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/singlePublicUserBookings/${profileId}`)
    // const bookings = await res.json()
    // console.log(bookings);

    try {
        const res = await fetchWithRefresh(`${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/singlePublicUserBookings/${profileId}`,
            {
                cache: 'no-store',
                method : "GET",
                headers: {
                    Cookie: `accessToken=${token}`, // manually bhejna padta hai
                },
            }
        ); 

        if (!res.ok) {
            // Handle HTTP errors (e.g., 404, 500)
            
        }

        bookings = await res.json();



        // console.log(bookings);
    } catch (error) {
        // Handle network errors, JSON parsing errors, or thrown errors
        console.error("Failed to fetch bookings:", error.message);
    }




    return (
        <NoSidebarLayout title={"User Profile"}>

            <div className='flex w-[20rem]  gap-3 bg-[white] '>
                <p className=' text-white m-0 bg-[black]' > <IoPersonSharp size={55} /></p>

                <div>
                    <p className='text-[1.5rem] font-semibold'>
                        Sami
                    </p>

                    <p className={`${meriendaFont.className} text-[white]  rounded bg-black text-center text-[.7rem] m-0`}>Public Pser</p>


                </div>

            </div>


            {/* bookings  */}

            <ProfileBookingTable bookings={bookings} />

        </NoSidebarLayout>
    )
}

export default UserProfile