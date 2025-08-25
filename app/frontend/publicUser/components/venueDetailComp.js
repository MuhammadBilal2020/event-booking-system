
import Image from "next/image";
import NoSidebarLayout from "../../layouts/nosidebarlayout";

import BookButton from "../../publicUser/components/BookButton";
import { getUserFromServer } from "@/app/hooks/getUserFromServer";
import Link from "next/link";
import { Merienda } from "next/font/google"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Gallery from "./framerMotion";

const meriendaFont = Merienda({
  subsets: ['latin'],
  weight: "700",
});

// const greatVibeFont = Great_Vibes({
//   subsets: ['latin'],
//   weight: "400",
// });

const VenueDetailComp = async ({ venue }) => {
  const user = await getUserFromServer();
  // console.log(user);

  return (
    <NoSidebarLayout title={"Venue Detail"}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        {/* Top Section: Title + First Image */}
        <div className="mb-8">
          <h1 className={`${meriendaFont.className} text-4xl font-bold text-center mb-4`}>{venue.venueName}</h1>
          {/* <Image
            src={venue.mainImage}
            alt="Main venue image"
            width={1200}
            height={700}
            className="rounded-2xl mt-[3rem] object-cover object-center  h-[400px] shadow-md"
          /> */}
        </div>

        {/* Description + Info */}
        <div className="grid md:grid-cols-3 gap-10 mb-8">
          <div className="shadow-sm p-5 md:col-span-1 col-span-3  rounded-md bg-gradient-to-r from-[#252525] via-[#3a3a3a] to-[#2b2a2a] ">
            <h2 className="text-[1.4rem] font-semibold mb-2 text-[#d7d3d3]">About the Vneue</h2>
            <p className="text-[white]">{venue.description}</p>

            <div className=" text-[#696868] mt-10 mb-4">
              <p><strong> Location:</strong> {venue.location}</p>
              <hr className="  mt-1 border-[#393737]" />
              <p className="mt-2"><strong> Type:</strong> {venue.venueType}</p>
              <hr className="  mt-1 border-[#393737]" />
              <p className="mt-2"><strong> Contact:</strong> {venue.contact}</p>
            </div>

          </div>

          {/* offers  */}
          <div className=" shadow-sm rounded text-[black] md:col-span-2 col-span-3 py-2 px-3 ">

            <Accordion type="single" collapsible>

              <h1 className={`${meriendaFont.className} text-center font-bold text-[1.4rem]`}>Offers</h1>
              {venue.offers.map((offer, i) => (

                <AccordionItem className="bg-[#ebebeb] mt-1 px-2" key={offer.offerId} value={`item - ${i + 1}`}>
                  <AccordionTrigger className="text-[#2e2e2e] text-[1.2rem]">Offer {i + 1}</AccordionTrigger>
                  <AccordionContent className="">
                    <p className="text-[1rem] text-[#313131]">{offer.offerDescription}</p>
                    <p className="text-blue-600 font-semibold text-xl mt-2">
                      Rs. {offer.offerPrice.toLocaleString()}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                // <div
                //   key={i}
                //   className="border-[#2b7fff] border-x-[1rem]  rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300 bg-gradient-to-tr "
                // >
                //   <p className="text-[1.2rem] text-[#313131]">{offer.offerDescription}</p>
                //   <p className="text-blue-600 font-semibold text-xl mt-2">
                //     Rs. {offer.offerPrice.toLocaleString()}
                //   </p>
                // </div>
              ))}



            </Accordion>
          </div>



          {/* <div className=" p-5 shadow-sm text-center">
            <h2 className="text-2xl font-semibold mb-2  text-[#333]">📅 Available Dates</h2>
            <ul className="list-disc list-inside text-gray-700">
              {venue.availableDates.map((date, i) => (
                <li key={i}>{date}</li>
              ))}
            </ul>
          </div> */}

          {/* Amenities */}
          {/* <div className=" shadow-sm p-5">
            <h2 className="text-2xl font-semibold mb-2 text-[#333]">🛠 Amenities</h2>
            <div className="flex  flex-wrap gap-2">
              {venue.amenities.map((item) => (
                <span
                  key={item._id}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div> */}


        </div>

        {/* Offers Section */}
        {/* <div className="">
          <h2 className="text-2xl font-semibold mb-4 text-[#333]">🎉 Packages & Offers</h2>
          <div className="grid grid-rows- grid-cols-2   gap-6">
            {venue.offers.map((offer, i) => (
              <div
                key={i}
                className="border-[#2b7fff] border-x-[1rem]  rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300 bg-gradient-to-tr "
              >
                <p className="text-[1.2rem] text-[#313131]">{offer.offerDescription}</p>
                <p className="text-blue-600 font-semibold text-xl mt-2">
                  Rs. {offer.offerPrice.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div> */}




        {/* Availability */}




        {/* Additional Images */}
        {/* <div>
          <h2 className="text-2xl font-semibold mt-5 mb-4 text-[#333]">📸 Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {venue ? (
              venue.galleryImages.map((image, i) => {
                return (
                  <Image
                    key={i}
                    src={image}
                    alt="Gallery image"
                    width={400}
                    height={250}
                    className="rounded-lg object-cover h-48 w-full shadow-sm"
                  />
                );
              })
            ) : (
              <p>no image</p>
            )}



          </div>
        </div> */}

        <div>

          {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {venue ? (
          venue.galleryImages.map((image, i) => (
            <div key={i} onClick={() => setSelectedImage(image)}>
              <Image
                src={image}
                alt={`Gallery image ${i}`}
                width={400}
                height={250}
                className="rounded-lg object-cover h-48 w-full shadow-sm cursor-pointer hover:scale-105 transition"
              />
            </div>
          ))
        ) : (
          <p>No image</p>
        )}
      </div> */}

          <Gallery venue={venue} />

          {/* Lightbox Modal */}

        </div>

        {/* <div className=" text-gray-700 mt-10 mb-4">
          <p><strong> Location:</strong> {venue.location}</p>
          <p><strong> Type:</strong> {venue.venueType}</p>
          <p><strong> Contact:</strong> {venue.contact}</p>
        </div> */}
        {user && user.role === "publicUser" ? (
          <div className="ms-auto my-6">
            <BookButton venue={venue} />
          </div>
        ) : (<Link href={"/frontend/publicUser/loginUser"} className="my-10 text-gray-600 hover:text-[#2b7fff]">login needed for booking!</Link>)}


      </div>
    </NoSidebarLayout>

  );
};

export default VenueDetailComp;
