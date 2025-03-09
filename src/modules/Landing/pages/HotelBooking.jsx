import React, { useState } from 'react';

const HotelBooking = () => {
  const [bookingInfo, setBookingInfo] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo({ ...bookingInfo, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for rooms with:', bookingInfo);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-10">
      <div className="container mx-auto">
   
        <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-4xl font-bold text-center mb-6">Book Your Stay</h2>
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block mb-2 text-gray-700">Check-In Date</label>
              <input
                type="date"
                name="checkIn"
                value={bookingInfo.checkIn}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Check-Out Date</label>
              <input
                type="date"
                name="checkOut"
                value={bookingInfo.checkOut}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Guests</label>
              <input
                type="number"
                name="guests"
                value={bookingInfo.guests}
                min="1"
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Rooms</label>
              <input
                type="number"
                name="rooms"
                value={bookingInfo.rooms}
                min="1"
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-500 transition-colors"
              >
                Search Availability
              </button>
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-3xl font-bold mb-8">Available Rooms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src="/images/room1.jpg"
                alt="Room"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">Deluxe Suite</h4>
              <p className="text-gray-600 mb-4">Enjoy a luxurious stay with king-sized beds and a balcony view.</p>
              <p className="text-gray-900 font-bold mb-4">$200 / night</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                Book Now
              </button>
            </div>
      
          </div>
        </div>
      </div>
    </div>
  );
}
export default HotelBooking;
