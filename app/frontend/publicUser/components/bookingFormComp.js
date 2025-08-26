'use client'

import React, { useEffect, useState } from 'react'

const BookingFormComp = ({ datesAvailable, venue }) => {
  // console.log(datesAvailable);
  const offers = venue.offers
  // console.log(offers);



  const [formData, setFormData] = useState({
    date: '',
    offerId: '',
    totalPrice: '',
    paymentMode: 'online',
    userNote: ''
  });

  const [availableDates, setAvailableDates] = useState([]);
  // const [offers, setOffers] = useState([]);
  const [userId, setUserId] = useState('');

  //   useEffect(() => {
  // setAvailableDates(datesAvailable)
  //   }, [availableDates])



  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const bookingPayload = {
    //   venueId,
    //   userId,
    //   ...formData,
    //   totalPrice: Number(formData.totalPrice),
    // };

    // const res = await fetch('/api/booking/create', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(bookingPayload)
    // });

    // const data = await res.json();
    // if (res.ok) {
    //   alert('Booking created successfully!');
    // } else {
    //   alert(data.error || 'Something went wrong');
    // }
  }

  return (
    <section className='max-w-md mx-auto mt-10 p-4 bg-white rounded shadow'>
      <h1 className='text-xl font-bold mb-4 text-center'>Booking Form</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>

        {/* Date Dropdown */}
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Select Date</label>
          <select name="date" value={formData.date} onChange={handleChange} className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400'>
            <option className='text-gray-200' value="">No date Selected</option>
            {datesAvailable.map((date, index) => (
              <option className='h-[10rem]' key={index} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        {/* Offer Dropdown (Optional) */}
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Select Offer </label>
          <select
            name="offerId"
            value={formData.offerId}
            onChange={(e) => {
              const value = e.target.value;
              const selectedOffer = offers.find(offer => offer.offerId === value);

              setFormData(prev => ({
                ...prev,
                offerId: value,
                totalPrice: selectedOffer ? selectedOffer.offerPrice : ""
              }));
            }}
            className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400'
          >
            <option value=""> No Offer </option>
            {offers.map((offer, idx) => (
              <option key={idx} value={offer.offerId}>
                {offer.offerId}
              </option>
            ))}
          </select>

        </div>

        {/* Total Price */}
        {/* <div>
          <label className='block'>Total Price</label>
          <input
            type="number"
            name="totalPrice"
            value={formData.totalPrice}
            className='w-full border px-2 py-1'
            required
            readOnly

          />

        </div> */}

        <div className="relative mb-2">
          <input
            type="number"
            id="totalPrice"
            name="totalPrice"
            aria-describedby="outlined_success_help"
            className="block p-2.5 w-full text-sm text-gray-900  bg-transparent rounded-lg border-1 border-[#e8e8e8] appearance-none dark:text-white dark:border-[black] focus:[black] focus:outline-none focus:ring-0 focus:border-[#b1b1b1] peer"
            placeholder=" "
            onChange={handleChange}
            value={formData.totalPrice}
            required
            readOnly

          />
          <label
            htmlFor="totalPrice"
            className="absolute text-sm text-[gray] dark:text-[#d4d2d2] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Total Price
          </label>
        </div>

        {/* Payment Mode */}
        <div>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Payment Mode</label>
          <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400'>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        {/* User Note */}
        <div>
          <label className='block'>Note </label>
          <textarea
            name="userNote"
            value={formData.userNote}
            placeholder='Write Note Here..'
            onChange={handleChange}
            className='block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>

        <button type="submit" className="w-full bg-black text-white py-2 rounded-md font-semibold 
             border-b-[1px] border-transparent 
             hover:bg-white hover:text-black hover:border-black 
             transition duration-200">Book Now</button>
      </form>
    </section>
  )
}

export default BookingFormComp;
