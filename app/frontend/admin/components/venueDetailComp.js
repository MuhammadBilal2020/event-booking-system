"use client";
import Image from "next/image";
import NoSidebarLayout from "../../layouts/nosidebarlayout";

const VenueDetailComp = ({ venue }) => {
  return (
    <NoSidebarLayout title={"Venue Detail"}>
        <div className="max-w-6xl mx-auto px-6 py-4">
      {/* Top Section: Title + First Image */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center text-[#2b7fff] mb-4">{venue.name}</h1>
        <Image
          src={venue.mainImages[0]}
          alt="Main venue image"
          width={1200}
          height={700}
          className="rounded-2xl object-cover w-full h-[400px] shadow-md"
        />
      </div>

      {/* Description + Info */}
      <div className="grid md:grid-cols-3 gap-10 mb-8">
        <div className="shadow-sm p-5">
          <h2 className="text-2xl font-semibold mb-2 text-[#333]">About the Venue</h2>
          <p className="text-gray-600 leading-relaxed">{venue.description}</p>
        </div>

         <div className=" p-5 shadow-sm text-center">
        <h2 className="text-2xl font-semibold mb-2  text-[#333]">📅 Available Dates</h2>
        <ul className="list-disc list-inside text-gray-700">
          {venue.availableDates.map((date, i) => (
            <li key={i}>{date}</li>
          ))}
        </ul>
      </div>

       {/* Amenities */}
      <div className=" shadow-sm p-5">
        <h2 className="text-2xl font-semibold mb-2 text-[#333]">🛠 Amenities</h2>
        <div className="flex  flex-wrap gap-2">
          {venue.amenities.map((item, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

        
      </div>

      {/* Offers Section */}
      <div className="">
        <h2 className="text-2xl font-semibold mb-4 text-[#333]">🎉 Packages & Offers</h2>
        <div className="grid grid-rows- grid-cols-2   gap-6">
          {venue.offers.map((offer) => (
            <div
              key={offer.offerid}
              className="border-[#2b7fff] border-x-[1rem]  rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300 bg-gradient-to-tr "
            >
              <p className="text-[1.2rem] text-[#313131]">{offer.offerDescription}</p>
              <p className="text-blue-600 font-semibold text-xl mt-2">
                Rs. {offer.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
     

     

      {/* Additional Images */}
      <div>
        <h2 className="text-2xl font-semibold mt-5 mb-4 text-[#333]">📸 Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          
            <Image
              
              src={venue.aboutImage}
              alt={"error"}
              width={400}
              height={250}
              className="rounded-lg object-cover h-48 w-full shadow-sm"
            />
        
        </div>
      </div>

      <div className=" text-gray-700 my-10 ">
          <p><strong>📍 Location:</strong> {venue.address}</p>
          <p><strong>🏢 Type:</strong> {venue.type}</p>
          <p><strong>📞 Contact:</strong> {venue.contact}</p>
        </div>
    </div>
    </NoSidebarLayout>
    
  );
};

export default VenueDetailComp;
