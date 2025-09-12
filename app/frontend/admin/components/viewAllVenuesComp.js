"use client"
import React from 'react'
import { AiFillOpenAI } from "react-icons/ai";
import Link from 'next/link';
import { toast } from 'sonner';

const ViewAllVenuesComp = ({ venues }) => {

    const deleteVenue = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/venue/deleteVenue`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({ id: id })
        });

        // Reload the page after successful deletion
        if (res.ok) {
            
            window.location.reload();
            toast.success("Venue deleted successfully!",
                {
                    style: {
                        background: "green",
                        color: "white",
                    },
                }
            )
        } else {
            console.error("Failed to delete venue");
            toast.error(`Error: ${result.error}`, {
                style: {
                    background: "red",
                    color: "white",
                },
            });
        }
    };

    return (
        <>
            <section>
                <h1 className='text-[1.4rem] font-medium '>List of Venues</h1>
                <div>
                    {venues ? venues.map((venue) => {
                        return (

                            <div key={venue._id} className='flex border-s-2 justify-between rounded bg-white mt-2 px-3 py-2'>
                                <div>

                                    <p className='flex items-center text-[1.1rem] gap-3'> <AiFillOpenAI /> {venue.venueName} , {venue.location}</p>
                                </div>

                                <div className='flex gap-2'>
                                    <Link href={`/frontend/admin/venue/editVenue/${venue._id}`} className='text-blue-600'>Edit</Link>
                                    <button onClick={() => deleteVenue(venue._id)} className='text-[red]'>Delete</button>

                                </div>

                            </div>


                        )

                    }) : <p>No Venues</p>}

                </div>


            </section>
        </>
    )
}

export default ViewAllVenuesComp