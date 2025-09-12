import React from 'react';
import NoSidebarLayout from '@/app/frontend/layouts/nosidebarlayout';
import EditVenueComp from '../../../components/editVenueComp';
import { getUserFromServer } from '@/app/hooks/getUserFromServer';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const EditVenue = async ({ params }) => {
  const { editId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const user = await getUserFromServer()

  if (!user || user.role !== 'Admin') {
    redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/admin/login`
    )

  }

  let venue;

  // ✅ Fetch venue from backend

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/singleVenue/${editId}`, {
      cache: 'no-store',
      method: "GET",
      headers: {
        Cookie: `accessToken=${token}`, // manually bhejna padta hai
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    venue = await res.json();
    console.log(venue);
  } catch (error) {
    console.error("Failed to fetch bookings:", error.message);

  }



  return (
    <NoSidebarLayout>
      <EditVenueComp venue={venue} editId={editId} />
    </NoSidebarLayout>
  );
};

export default EditVenue;
