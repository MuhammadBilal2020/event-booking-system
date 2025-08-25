import React from 'react';
import NoSidebarLayout from '@/app/frontend/layouts/nosidebarlayout';
import EditVenueComp from '../../../components/editVenueComp';
import { getUserFromServer } from '@/app/hooks/getUserFromServer';
import { redirect } from 'next/navigation';

const EditVenue = async ({ params }) => {
  const { editId } = await params;
  const user = await getUserFromServer()

  if(!user || user.role !== 'Admin'){
        redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/frontend/admin/login`
    )
        
      }

  // ✅ Fetch venue from backend
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/singleVenue/${editId}`, {
    cache: 'no-store', // so we always get fresh data
  });

  const venue = await res.json();
  console.log(venue);
  

  return (
    <NoSidebarLayout>
      <EditVenueComp venue={venue} editId ={editId} />
    </NoSidebarLayout>
  );
};

export default EditVenue;
