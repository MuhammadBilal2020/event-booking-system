import React from 'react'
import BookingFormComp from '../../../components/bookingFormComp';
import { getUserFromServer } from '@/app/hooks/getUserFromServer';
import { redirect } from 'next/navigation';
import NoSidebarLayout from '@/app/frontend/layouts/nosidebarlayout';

// import { useRouter } from 'next/navigation';


const BookingForm = async ({ params }) => {
  const { venueId } = await params
  // const router = useRouter()
  const user = await getUserFromServer()
  if (!user || user.role !== "publicUser") {
    console.log("for booking u need to login first")
    redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/publicUser/loginUser`)



  }
  console.log(`this is the booking form of this venue : ${venueId}`);
  console.log(user);


  const res1 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/singleVenue/${venueId}`);
  const singleVenueData = await res1.json();
  // console.log(singleVenueData);



  const res2 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/venuesAvailableDates?venueId=${venueId}`);
  const availableDatesData = await res2.json();


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

// acha sahi mgr aba aik aur kam kerna men chahta hoon k available srif next month tak ki ho
// is k lfunction h mere pass but mujeh ye btao isko direct backend se save kraon venue ki collection k andr , q k mujeh scenerio aesa chye k jese aaj men venue add kerta hoon to 6 onth later tak ki dates available hongi right ,
// lekin men chahta hoon jese mene aaj add ki h jese 7/26/2025 aaj ki date h
// aur aaj sesix month tk date available hon, ab date hogi 7/27/2025 to to uske agle six month ki date availble hon matlab jo bhi date ho ose nect six month ki date avalable honi chye

// mere pass ye function h 