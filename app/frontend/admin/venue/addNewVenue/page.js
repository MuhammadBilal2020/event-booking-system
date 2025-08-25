'use client';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdDelete } from "react-icons/md";
import handleImageUpload from '@/app/utils/cloudinaryUploader';
import { useUser } from '@/app/context/userContext';
import { useRouter } from 'next/navigation';
// import { getUserFromServer } from '@/app/hooks/getUserFromServer';
import { fetchWithRefreshClient } from '@/app/utils/clientInterceptor.js';

export default  function AddVenueForm() {
  //  const router = useRouter();
  const router = useRouter();
  // const { user } = useUser();
  
  const [isChecking, setIsChecking] = useState(true);

     const [user, setUser] = useState();

  // ✅ fetch user in useEffect
  useEffect(() => {
    (async () => {
      const res = await fetchWithRefreshClient("/api/auth/me", {}, "user");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    })();
  }, []);

  console.log(user);
  

  useEffect(() => {
    if (user === undefined) return; // abhi loading hai

    if (!user || user.role !== "Admin") {
      router.push("/frontend/admin/login");
    }
  }, [user]);




  // const [amenities, setAmenities] = useState([{ name: '' }]);
  const [offers, setOffers] = useState([
    { offerId: uuidv4(), offerDescription: '', offerPrice: '' },
  ]);

  // const handleAddAmenity = () => {
  //   setAmenities([...amenities, { name: '' }]);
  // };

  // const handleDeleteAmenity = (index) => {
  //   const updated = amenities.filter((_, i) => i !== index);
  //   setAmenities(updated);
  // };


  // const handleAmenityChange = (index, value) => {
  //   const updated = [...amenities];
  //   updated[index].name = value;
  //   setAmenities(updated);
  // };

  const handleAddOffer = () => {
    setOffers([
      ...offers,
      { offerId: uuidv4(), offerDescription: '', offerPrice: '' },
    ]);
  };

  const handleDeleteOffer = (index) => {
    const delteOffer = offers.filter((_, i) => i !== index)
    setOffers(delteOffer)
  }

  const handleOfferChange = (index, field, value) => {
    const updated = [...offers];
    updated[index][field] = value;
    setOffers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const mainImageFile = form.get("mainImage");
    const galleryImageFiles = form.getAll("galleryImages");

    const cloudName = "dpdxrs2pg";
    const uploadPreset = "EBS-images";

    try {
      // Upload main image
      const [mainImageUrl] = await handleImageUpload(
        [mainImageFile],
        uploadPreset,
        cloudName
      );

      // Upload gallery images
      const galleryImageUrls = await handleImageUpload(
        galleryImageFiles,
        uploadPreset,
        cloudName
      );

      // Prepare final form data
      const formData = {
        venueName: form.get("venueName"),
        mainImage: mainImageUrl,
        description: form.get("description"),
        galleryImages: galleryImageUrls,
        venueType: form.get("venueType"),
        contact: form.get("contact"),
        location: form.get("location"),
        // amenities,
        offers,
        status: 'active'
      };

      console.log(formData);

      // Send to backend
     const res = await fetchWithRefreshClient("/api/venue/addVenue", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",   // cookie bhejne ke liye
  body: JSON.stringify(formData),
});


      const result = await res.json();
      console.log(result);


      if (res.ok) {
        console.log(result);

        alert("Venue submitted successfully!");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error("Error submitting venue:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-800">Add New Venue</h1>

        {/* Venue Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Venue Name</label>
          <input
            type="text"
            name="venueName"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Main Image */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Main Image</label>
          <input
            type="file"
            name="mainImage"
            accept="image/*"
            required
            className="w-full border border-gray-300 rounded-lg p-2 bg-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Amenities */}
        {/* <div>
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-gray-800">Amenities</label>
            <button
              type="button"
              onClick={handleAddAmenity}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
            >
              <AiOutlinePlus size={20} />
              Add Amenity
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {amenities.map((item, index) => (
              <>

                <div className='flex justify-evenly gap-5'>
                  <input
                    key={index}
                    type="text"
                    placeholder="Amenity"
                    value={item.name}
                    onChange={(e) => handleAmenityChange(index, e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />

                  <button
                    type="button"
                    onClick={() => handleDeleteAmenity(index)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800"
                  >
                    <MdDelete size={20} />
                    Delete
                  </button>

                  

                </div>
              </>

            ))}
          </div>
        </div> */}

        {/* Offers */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-gray-800">
              Packages & Offers
            </label>
            <button
              type="button"
              onClick={handleAddOffer}
              className="flex items-center gap-1 text-green-600 hover:text-green-800"
            >
              <AiOutlinePlus size={20} />
              Add Offer
            </button>
          </div>

          <div className="mt-2 space-y-4">
            {offers.map((offer, index) => (
              <div key={offer.offerId} className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <textarea
                  type="text"
                  placeholder="Offer Description"
                  value={offer.offerDescription}
                  onChange={(e) =>
                    handleOfferChange(index, 'offerDescription', e.target.value)
                  }
                  required
                  className=" border border-gray-300 rounded-lg px-4 py-2"
                />

                <div className='flex justify-between items-center'>
                  <input
                    type="number"
                    placeholder="Offer Price"
                    value={offer.offerPrice}
                    onChange={(e) =>
                      handleOfferChange(index, 'offerPrice', e.target.value)
                    }
                    required
                    className="w-[70%] border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <div className='flex justify-end gap-5'>
                    <button
                      type="button"
                      onClick={() => handleDeleteOffer(index)}
                      className="flex items-center text-red-600 hover:text-red-800"
                    >
                      <MdDelete size={20} />
                      Delete
                    </button>
                    {/* <button
                    type="button"
                    onClick={() => handleOfferChange(index)}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <MdDelete size={20} />
                    Edit
                  </button> */}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Images */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Gallery Images</label>
          <input
            type="file"
            name="galleryImages"
            multiple
            accept="image/*"
            className="w-full border border-gray-300 rounded-lg p-2 bg-white"
          />
        </div>

        {/* Venue Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Venue Type</label>
          <input
            type="text"
            name="venueType"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Contact</label>
          <input
            type="text"
            name="contact"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>



        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition"
        >
          Submit Venue
        </button>
      </form>
    </div>
  );
}
