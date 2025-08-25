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
          <label className='block'>Select Date</label>
          <select name="date" value={formData.date} onChange={handleChange} className='w-full  border px-2 py-1'>
            <option value="">-- Choose a date --</option>
            {datesAvailable.map((date, index) => (
              <option className='h-[10rem]' key={index} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        {/* Offer Dropdown (Optional) */}
        <div>
          <label className='block'>Select Offer (optional)</label>
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
            className='w-full border px-2 py-1'
          >
            <option value="">-- No Offer --</option>
            {offers.map((offer, idx) => (
              <option key={idx} value={offer.offerId}>
                {offer.offerId}
              </option>
            ))}
          </select>

        </div>

        {/* Total Price */}
        <div>
          <label className='block'>Total Price</label>
          <input
            type="number"
            name="totalPrice"
            value={formData.totalPrice}
            readOnly
            className='w-full border px-2 py-1'
            required
          />

        </div>

        {/* Payment Mode */}
        <div>
          <label className='block'>Payment Mode</label>
          <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className='w-full border px-2 py-1'>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        {/* User Note */}
        <div>
          <label className='block'>Note (optional)</label>
          <textarea
            name="userNote"
            value={formData.userNote}
            onChange={handleChange}
            className='w-full border px-2 py-1'
          />
        </div>

        <button type="submit" className='w-full bg-blue-500 text-white py-2 rounded'>Book Now</button>
      </form>
    </section>
  )
}

export default BookingFormComp;
