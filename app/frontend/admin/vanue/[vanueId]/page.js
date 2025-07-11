import React from 'react'
import VenueDetailComp from '../../components/venueDetailComp';

const VanueDetail =async ({params}) => {
    const {vanueId} = await params

  const dummyVenue = {
  name: "Glits Banquet",
  mainImages: ["/images/main-image-2.jpg", "/images/venue2.jpg"],
  aboutImage : "/images/about-image.jpg",
  address: "DHA Phase 5, Lahore",
  offers: [
    { offerid: "242341", offerDescription: "200 guest with sound system and every think", price: 40000 },
    { offerid: "223341", offerDescription: "300 guest with sound system and every think", price: 70000 },
    { offerid: "124352", offerDescription: "500 guest with sound system and every think", price: 100000 },
  ],
  availableDates: ["10 July 2025", "15 July 2025", "20 July 2025"],
  contact: "0312-1234567",
  amenities: ["AC", "Parking", "Security", "Sound System", "Generator"],
  type: "Banquet Hall",
  description: "A luxury banquet hall perfect for weddings and events. A luxury banquet hall perfect for weddings and events. A luxury banquet hall perfect for weddings and events."
};
  return (
    <VenueDetailComp venue={dummyVenue}/>
  )
}

export default VanueDetail