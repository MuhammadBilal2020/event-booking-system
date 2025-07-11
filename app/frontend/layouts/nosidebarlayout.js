import React from 'react'
import NoSidebarNav from '../admin/components/noSidebarNav'
import Footer from '../admin/components/footer'

const NoSidebarLayout = ({children ,title}) => {
    return (
        <>
            <NoSidebarNav title={title}/>
            <main className="md:px-[4rem] px-[2rem] pt-[2rem]">{children}</main>
            <Footer />
        </>
    )
}

export default NoSidebarLayout