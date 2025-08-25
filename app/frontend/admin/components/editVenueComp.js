"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import handleImageUpload from "@/app/utils/cloudinaryUploader";

const EditVenueComp = ({ venue, editId }) => {
  const [amenities, setAmenities] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletedGalleryImages, setDeletedGalleryImages] = useState([]);
  const [deletedMainImage, setDeletedMainImage] = useState(false);
  const [mainImagePreview, setMainImagePreview] = useState(venue.mainImage || null);






  const handleDeleteOldImage = (imageUrl) => {
    setDeletedGalleryImages([...deletedGalleryImages, imageUrl]);

    // Also remove from preview immediately
    venue.galleryImages = venue.galleryImages.filter(img => img !== imageUrl);
  };



  // Prefill on load
  useEffect(() => {
    if (venue) {
      setAmenities(venue.amenities || []);
      setOffers(venue.offers || []);
    }
  }, [venue]);

  const handleAddAmenity = () => setAmenities([...amenities, { name: "" }]);

  const handleDeleteAmenity = (index) =>
    setAmenities(amenities.filter((_, i) => i !== index));

  const handleAmenityChange = (index, value) => {
    const updated = [...amenities];
    updated[index].name = value;
    setAmenities(updated);
  };

  const handleAddOffer = () =>
    setOffers([
      ...offers,
      { offerId: uuidv4(), offerDescription: "", offerPrice: "" },
    ]);

  const handleDeleteOffer = (index) =>
    setOffers(offers.filter((_, i) => i !== index));

  const handleOfferChange = (index, field, value) => {
    const updated = [...offers];
    updated[index][field] = value;
    setOffers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const mainImageFile = form.get("mainImage");
    const galleryImageFiles = form.getAll("galleryImages");

    const cloudName = "dpdxrs2pg";
    const uploadPreset = "EBS-images";

    try {
      let mainImageUrl = venue.mainImage || "";

      if (deletedMainImage) {
        mainImageUrl = "";
      } else if (mainImageFile && mainImageFile.name) {
        const [uploadedMain] = await handleImageUpload(
          [mainImageFile],
          uploadPreset,
          cloudName
        );
        mainImageUrl = uploadedMain;
      }


      let galleryImageUrls = venue.galleryImages || [];
      galleryImageUrls = galleryImageUrls.filter(
        (img) => !deletedGalleryImages.includes(img)
      );

      // ADD new ones if any
      if (galleryImageFiles[0] && galleryImageFiles[0].name) {
        const newUploads = await handleImageUpload(
          galleryImageFiles,
          uploadPreset,
          cloudName
        );
        galleryImageUrls = [...galleryImageUrls, ...newUploads]; // 👈 merge
      }

      const formData = {
        id: venue._id, // IMPORTANT: used in PUT API
        venueName: form.get("venueName"),
        mainImage: mainImageUrl,
        description: form.get("description"),
        galleryImages: galleryImageUrls,
        venueType: form.get("venueType"),
        contact: form.get("contact"),
        location: form.get("location"),
        amenities,
        offers,
      };

      console.log(formData);


      const res = await fetch("/api/venue/editVenue", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editId,   // 👈 yahan se bhej rahe ho id
          ...formData,  // 👈 aur yahan baki ka form data
        }),
      });


      const result = await res.json();
      setLoading(false);

      if (res.ok) {
        alert("Venue updated successfully!");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong!");
      setLoading(false);
    }
  };

  if (!venue) return <p>Loading venue...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-800">Edit Venue</h1>

        <div>
          <label className="block mb-1">Venue Name</label>
          <input
            type="text"
            name="venueName"
            defaultValue={venue.venueName}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
        <div>
  <label className="block mb-1">Main Image</label>

  {/* Always show input */}
  <input
    type="file"
    name="mainImage"
    accept="image/*"
    className="w-full border rounded-lg p-2 mb-2"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        setMainImagePreview(URL.createObjectURL(file));
        setDeletedMainImage(false); // user re-added image
      }
    }}
  />

  {/* Image Preview */}
  {mainImagePreview && !deletedMainImage && (
    <div className="relative w-fit">
      <img
        src={mainImagePreview}
        alt="Main Image Preview"
        className="w-32 h-32 object-cover rounded"
      />
      <button
        type="button"
        onClick={() => {
          setDeletedMainImage(true);
          setMainImagePreview(null);
        }}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
      >
        <MdDelete />
      </button>
    </div>
  )}
</div>




        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            defaultValue={venue.description}
            required
            className="w-full border rounded-lg px-4 py-2 min-h-[100px]"
          ></textarea>
        </div>

        {/* Amenities */}
        <div>
          <div className="flex justify-between">
            <label className="text-lg font-semibold">Amenities</label>
            <button type="button" onClick={handleAddAmenity} className="text-blue-600 flex items-center gap-1">
              <AiOutlinePlus /> Add Amenity
            </button>
          </div>
          <div className="space-y-2 mt-2">
            {amenities.map((item, index) => (
              <div key={index} className="flex gap-4">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleAmenityChange(index, e.target.value)}
                  required
                  className="w-full border rounded-lg px-4 py-2"
                />
                <button type="button" onClick={() => handleDeleteAmenity(index)} className="text-red-600">
                  <MdDelete size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Offers */}
        <div>
          <div className="flex justify-between">
            <label className="text-lg font-semibold">Packages & Offers</label>
            <button type="button" onClick={handleAddOffer} className="text-green-600 flex items-center gap-1">
              <AiOutlinePlus /> Add Offer
            </button>
          </div>
          <div className="space-y-4 mt-2">
            {offers.map((offer, index) => (
              <div key={offer.offerId} className="space-y-2">
                <textarea
                  placeholder="Offer Description"
                  value={offer.offerDescription}
                  onChange={(e) => handleOfferChange(index, "offerDescription", e.target.value)}
                  required
                  className="w-full border rounded-lg px-4 py-2"
                />
                <div className="flex gap-4 items-center">
                  <input
                    type="number"
                    placeholder="Offer Price"
                    value={offer.offerPrice}
                    onChange={(e) => handleOfferChange(index, "offerPrice", e.target.value)}
                    required
                    className="w-full border rounded-lg px-4 py-2"
                  />
                  <button type="button" onClick={() => handleDeleteOffer(index)} className="text-red-600">
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div>
          <label className="block mb-1">Gallery Images</label>
          <input type="file" name="galleryImages" multiple accept="image/*" className="w-full border rounded-lg p-2" />
        </div>


        <div className="flex items-center gap-3 flex-wrap">
          {venue.galleryImages && venue.galleryImages.map((image, i) => (
            <div key={i} className="relative">
              <img
                src={image}
                alt="Previous Main"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => handleDeleteOldImage(image)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>

        <div>
          <label className="block mb-1">Venue Type</label>
          <input
            type="text"
            name="venueType"
            defaultValue={venue.venueType}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>



        <div>
          <label className="block mb-1">Contact</label>
          <input
            type="text"
            name="contact"
            defaultValue={venue.contact}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            name="location"
            defaultValue={venue.location}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Updating..." : "Update Venue"}
        </button>
      </form>
    </div>
  );
};

export default EditVenueComp;
