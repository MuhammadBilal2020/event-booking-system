import React from 'react'

const EventDetail = () => {
  return (
    <div>Event Detail</div>
  )
}

export default EventDetail



// 2. Event Detail Page (Dynamic + SSR)
// Route: /event/[id]

// Server-side fetch event detail.

// Show full description + “Book Now” button.


// ✅ Phase 3: Booking System (Day 4)
// 1. Booking Form on Event Page
// Input fields: Name, Email, Phone

// Submit form -> API: POST /api/book

// Store in bookings collection with event ID

// 2. Success Message
// Show confirmation after booking

// Optionally send confirmation email (optional)