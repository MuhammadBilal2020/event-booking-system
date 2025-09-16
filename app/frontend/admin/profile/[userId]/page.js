"use client"
import React, { useEffect, useState } from 'react'
import MenuLayouts from '@/app/frontend/layouts/MenuLayouts'

import { IoPersonSharp } from "react-icons/io5";
import { Merienda } from "next/font/google"
import { fetchWithRefreshClient } from '@/app/utils/clientInterceptor'
import { useRouter } from 'next/navigation';
import ProfileBookingRecords from '../../components/profileBookingRecords';

const meriendaFont = Merienda({
  subsets: ['latin'],
  weight: "700",
});




const AdminProfile = ({ params }) => {
  const { userId } = React.use(params);
  const router = useRouter();
  const [user, setUser] = useState();
  const [bookings, setBookings] = useState(null)
  const [profileUser, setProfileUser] = useState(null)
  // console.log(userId);

  // const cookieStore = await cookies();
  // const token = cookieStore.get("accessToken")?.value;
  // console.log(token);



  // let profileUser = []

  // const user = await getUserFromServer()
  // if (!user || user.role !== 'Admin') {
  //   redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/admin/login`
  //   )

  // }

  useEffect(() => {
    (async () => {
      const res = await fetchWithRefreshClient("/api/auth/me", {}, "user");
      // console.log(res);

      if (res.ok) {
        const data = await res.json();
        // console.log(data);

        setUser(data);
        console.log(data);

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



  // single user data 
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchWithRefreshClient(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user/getSingleUser/${userId}`,
          {
            cache: 'no-store',
            method: "GET",
            credentials: "include",

          }
        )
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json()
        setProfileUser(data)
        // console.log(profileUser);

      } catch (error) {
        console.error("Failed to fetch bookings:", error.message);
      }
    })()
  }, [user])




  // get single admin booking handling 
  useEffect(() => {
    (async () => {
      try {
        const res2 = await fetchWithRefreshClient(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/singleAdminBookings/${userId}`,
          {
            cache: 'no-store',
            method: "GET",
            credentials: "include",
          }

        );

        if (!res2.ok) {
          throw new Error(`Failed to fetch: ${res2.status}`);
        }

        const handlingRecords = await res2.json();
        console.log(handlingRecords.bookings);

        const data = handlingRecords.bookings
        setBookings(data)

        // Use data here
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    })()
  }, [user])







  return (

    <>

      <MenuLayouts title={"Profile"}>


        {profileUser && bookings ? (
          <><div className='flex w-[20rem]  gap-3 bg-[white] '>
            <p className=' text-white m-0 bg-[black]' > <IoPersonSharp size={55} /></p>

            <div>
              <p className='text-[1.5rem] font-semibold'>
                {profileUser.name}
              </p>

              <p className={`${meriendaFont.className} text-[white]  rounded bg-black text-center text-[.7rem] m-0`}>{profileUser.role}</p>


            </div>

          </div>
            <ProfileBookingRecords bookings={bookings} />
          </>
        ) : <div className="flex items-center gap-2 justify-center min-h-screen bg-white">
          loading

          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>}

        {/* {bookings &&

        } */}


        {/* past booking recors  */}

        {/* <div className='booking records mt-2'>

                    <h1 className='font-semibold text-[1.3rem]'>Booking records</h1>

                    <div className=' mt-3 w-[35rem]'>
                        <div className='btns text-[1.1rem] flex justify-between items-center '>
                            <button className='bg-[#3c3c3c] text-[white]  px-2 py-1 rounded'>All</button> 
                            <button  className='bg-[white] px-2  py-1 rounded'>Accepted</button> 
                            <button  className='bg-[white] px-2  py-1 rounded'>Rejected</button> 
                            <button  className='bg-[white] px-2  py-1 rounded'>Cancled</button> 

                        </div>
                    </div>

                    <section className='booking-status mt-5 pb-[3.5rem] '>
                              <div className="relative overflow-x-auto  sm:rounded-lg">
                                <table className="w-full border-separate border-spacing-y-2 text-sm text-left rtl:text-right ">
                                 
                                  <thead className=" ">
                                    <tr className='bg-[#3a3a3a]  text-white'>
                                      <th scope="col" className="px-6 py-3">
                                        Booking Venue
                                      </th>
                                      <th scope="col" className="px-6 py-3">
                                        Booking Date
                                      </th>
                                      <th scope="col" className="px-6 py-3">
                                        Booker
                                      </th>
                                      <th scope="col" className="px-6 py-3">
                                        Status
                                      </th>
                                      <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                    
                                    {bookings ? bookings.map((booking ,i) => {
                                      return (
                                      
                                        <tr key={i} className="bg-[#e0dfdf]  radius-2" >
                                          <td
                                            scope="row"
                                            className="px-6 py-4 radius-l font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                          >
                                            {booking.bookingVenue}
                                          </td>
                                          <td className="px-6 py-4 ">{booking.Date}</td>
                                          <td className="px-6 py-4">{booking.booker}</td>
                                          <td className="px-6 py-4 "><span className='bg-[red] px-[.6rem] pt-[.2rem] radius-1 pb-[.25rem]'>
                                            {booking.status}
                                            </span></td>
                                          <td className="px-6 py-4 radius-r text-right">
                                            <a
                                              href="#"
                                              className="font-medium  hover:underline"
                                            >
                                             <IoEye size={20}/>
                                            </a>
                                          </td>
                                        </tr> 
                                       
                                       
                    
                                      )
                                    }) : <h1>No bookings</h1>}
                    
                    
                                  </tbody>
                                </table>
                              </div>
                    
                    
                            </section>

                </div> */}



      </MenuLayouts>
    </>
  )
}

export default AdminProfile