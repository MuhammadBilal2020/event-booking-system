import Link from 'next/link'
import React from 'react'

const VanuesComponent = ({ venues }) => {
    
    return (
        <section className='all-vanues p-3 flex gap-[1rem]'>
            {
                venues && venues.length > 0 ? venues.map((venue) => {
                    return (
                        <div className='py-[2rem] rounded card-border bg-[#e6e6e6] w-[17rem] shadow  text-center' key={venue._id}>
                            <Link href={`/frontend/publicUser/vanue/${venue._id}`} className='text-[2rem]  font-semibold'>{venue.venueName}</Link>
                            <br />
                            {/* <p className='mt-2'>{venue.description}</p> */}
                            <span className='text-[#919191]'>{venue.location}</span>
                            
                        </div>
                    )
                }) : <h1>No venues!</h1>
            }
        </section>
    )
}

export default VanuesComponent
