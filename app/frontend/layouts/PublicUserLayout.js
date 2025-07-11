import React from 'react'
import UserNavbar from '../publicUser/components/UserNavbar'

const PublicUserLayout = ({children}) => {
  return (
  <>
   <UserNavbar user={{name : "Bilal"}}/>
    <main className="md:px-[4rem] px-[2rem] pt-[2rem]">{children}</main>

  </>
  )
}

export default PublicUserLayout