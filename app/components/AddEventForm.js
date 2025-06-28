'use client';

import { useState } from "react";

export default function AddEventForm({products}) {
    console.log(products);
    
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        date: ''
    });

    const [event , setEvents] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // yahan API ya backend se connect karo

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event/add-event`,

                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                }
            )
            const newEvent = await res.json();
            console.log(newEvent);
            
        }
        catch (error) {
            console.log(error);

        }
    };

    return (
        <div className="w-full">


            {showForm ?
                <div>
                    <div className="flex justify-between items-center w-full ">
                        <div className="w-[54%] text-end">

                            <h1 >Add New Event</h1>
                        </div>
                        <div>
                            <button onClick={() => setShowForm(prev => !prev)} className="bg-[gray] w-[rem] px-1 py-2">{showForm ? 'close form ' : 'Add New Event'}</button>
                        </div>

                    </div>

                    <div className=" flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100 p-6">

                        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
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
                </div>
                :

                <div>
                    

                    <div className="flex justify-between items-center w-full ">
                        <div className="w-[50%] text-end">

                            <h1 >Events</h1>
                        </div>
                        <div>
                            <button onClick={() => { setShowForm(true) }} className="bg-[gray] w-[rem] px-1 py-2">{showForm ? 'close form ' : 'Add New Event'}</button>
                        </div>

                    </div>

                    <div>
       <h1 className="text-center text-[1.5rem] font-semibold">List of Events</h1>
       <div className="p-4">
         {products.map((event) => (
         <div
           key={event._id}
            className="bg-white rounded-lg shadow-md p-4 mb-4"
       >
       <h2 className="text-xl font-bold">{event.title}</h2>
           <p className="text-sm text-gray-600">📅 {event.date}</p>
           <p className="text-sm text-gray-600">📍 {event.location}</p>
           <p className="mt-2">{event.description}</p>
          </div>
        ))}
       </div>
     </div>
                </div>
            }
        </div>
    );
}
