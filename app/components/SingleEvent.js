"use client"
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";

const SingleEvent = ({ event }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const [openForm, setOpenForm] = useState(true)
   const [title ,setTitle] = useState("")
  //  const [date ,setDate] = useState("")
  //  const [location ,setLocation] = useState("")
  //  const [description ,setDescription] = useState("")
  const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        date: ''
    });
   useEffect(() => {
  setFormData({
    title: event.title || "",
    description: event.description || "",
    location: event.location || "",
    date: event.date || ""
  });
}, [event]);



  const openDropDown = () => setOpen(prev => !prev);

 const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

  const deleteEvent = async () => {
    const res = await fetch("/api/event/delete-event", {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: event._id })
    });

    router.push("/")


  };

  const editEvent = async (e) => {
    e.preventDefault(); // prevent default form reload
    const res = await fetch("/api/event/edit-event", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: event._id, ...formData })

    });
    const updatedEvent = await res.json()
    console.log(updatedEvent)

     setFormData({
    title: "",
    description: "",
    location: "",
    date: ""
  });
  
    router.push("/")
    
  };

  return (
    <>
      {openForm ?
        <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-xl mt-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-700 mb-2">{event.title}</h1>

            {/* Dots + Dropdown */}
            <div className="relative">
              <span onClick={openDropDown} className="cursor-pointer">
                <HiOutlineDotsVertical size={20} />
              </span>

              {open && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded border border-gray-200 w-[8rem] z-10">
                  <button onClick={deleteEvent} className="w-full px-4 py-2 hover:bg-gray-100 text-left text-sm text-red-500">
                    Delete
                  </button>
                  <button onClick={() => setOpenForm(false)} className="w-full px-4 py-2 hover:bg-gray-100 text-left text-sm text-blue-500">
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="mb-3 text-gray-700">{event.description}</p>
          <p className="text-gray-500">📍 {event.location}</p>
          <p className="text-gray-500">📅 {event.date}</p>
        </div>
        : <div className=" flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100 p-6">

                        <form onSubmit={editEvent}  className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                            <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Book an Event</h2>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Event Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Enter title"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Event details"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Venue or Address"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
}
    </>


  )
}

export default SingleEvent;
