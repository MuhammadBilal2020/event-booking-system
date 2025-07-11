import Link from 'next/link'
import React from 'react'

const VanuesComponent = ({ vanues }) => {
    return (
        <section className='all-vanues p-3'>
            {
                vanues && vanues.length > 0 ? vanues.map((vanue) => {
                    return (
                        <div className='p-3 w-[20rem] shadow-sm text-center' key={vanue.vanueId}>
                            <Link href={`/frontend/admin/vanue/${vanue.vanueId}`} className='text-[1.5rem]  font-semibold'>{vanue.vanueName}</Link>
                            <p className='mt-2'>{vanue.description}</p>
                            <span>{vanue.location}</span>
                            
                        </div>
                    )
                }) : <h1>No venues!</h1>
            }
        </section>
    )
}

export default VanuesComponent
