import React from 'react'
import BookingFormComp from '../../../components/bookingFormComp';
import { getUserFromServer } from '@/app/hooks/getUserFromServer';
import { redirect } from 'next/navigation';
import NoSidebarLayout from '@/app/frontend/layouts/nosidebarlayout';
import { cookies } from 'next/headers';

// import { useRouter } from 'next/navigation';


const BookingForm = async ({ params }) => {
  const { venueId } = await params
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  console.log(token);
  // const router = useRouter()

  const user = await getUserFromServer()
  if (!user || user.role !== "publicUser") {
    console.log("for booking u need to login first")
    redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/publicUser/loginUser`)
  }
  console.log(`this is the booking form of this venue : ${venueId}`);
  console.log(user);
  let singleVenueData;
  let availableDatesData;


  // get Single venue 
  try {
    const res1 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/singleVenue/${venueId}`,
      {
        cache: 'no-store',
        method: "GET",
        headers: {
          Cookie: `accessToken=${token}`, // manually bhejna padta hai
        },

      }


    );

    if (!res1.ok) {
      // Handle HTTP errors (e.g., 404, 500)
      throw new Error(`HTTP error! Status: ${res1.status}`);
    }
    singleVenueData = await res1.json();
    console.log(singleVenueData);
    


  } catch (error) {
    console.error("Failed to fetch bookings:", error.message);
  }


  
// get Avaiable dates 
try {
  const res2 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/venuesAvailableDates?venueId=${venueId}`,
     {
        cache: 'no-store',
        method: "GET",
        headers: {
          Cookie: `accessToken=${token}`, // manually bhejna padta hai
        },

      }
  );
   if (!res2.ok) {
      // Handle HTTP errors (e.g., 404, 500)
      throw new Error(`HTTP error! Status: ${res1.status}`);
    }

   availableDatesData = await res2.json();
  // console.log(availableDatesData);
  

  
} catch (error) {
  console.error("Failed to fetch bookings:", error.message);
}

  


  // console.log(availableDatesData.availableDates);


  return (
    <>
      <NoSidebarLayout title={"Book Vanue Form"}>
        <section className=''>
          <BookingFormComp venue={singleVenueData} datesAvailable={availableDatesData.availableDates} />

        </section>
      </NoSidebarLayout>

    </>
  )
}

export default BookingForm

