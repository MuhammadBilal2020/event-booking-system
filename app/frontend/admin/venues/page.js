import React from 'react'
import MenuLayouts from '../../layouts/MenuLayouts'
import VanuesComponent from '../components/venuescomp'

const Venues = () => {
       const vanues = [
        {
            vanueId : "34665",
            vanueName: "Glits Banquet",
            location: "waterpump",
            description: "we are providng this venue for multiple purposes etc.....",
           
        }
    ]

    
const dummyVenue = {
  name: "Glits Banquet",
  images: [
    "/images/venue1.jpg",
    "/images/venue2.jpg"
  ],
  address: "DHA Phase 5, Lahore",
   offers: [
                { offerid :"242341",offerDescription: "200 guest ", price: 40000 },
                { offerid :"223341", offerDescription: "300 guest ", price: 70000 },
                { offerid :"124352" , offerDescription: "500 guest ", price: 100000 },
            ],
  availableDates: ["10 July 2025", "15 July 2025", "20 July 2025"],
  contact: "0312-1234567",
  amenities: ["AC", "Parking", "Security", "Sound System", "Generator"],
  type: "Banquet Hall",
  description: "A luxury banquet hall perfect for weddings and events."
};


  return (
    <MenuLayouts title={"Venues"}>
        <VanuesComponent vanues ={vanues}/>

    </MenuLayouts>
  )
}

export default Venues