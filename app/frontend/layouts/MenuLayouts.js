import React from 'react'
import Sidebar from '../admin/components/sidebar'
import Footer from '../admin/components/footer'

const MenuLayouts = ({children ,title}) => {
  return (
    <>
  <Sidebar title ={title}/>
   <main className="md:px-[4rem] px-[2rem] pt-[2rem]">{children}</main>
   <Footer />

    </>
  )
}

export default MenuLayouts