import React from 'react';


const Rooms = () => {
  return (
    <section className="py-16 px-10">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Rooms & Suites</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <img src="/images/room3.jpg" alt="Luxury Room" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-semibold">Luxury Room</h3>
            <p className="mt-4 text-gray-600">Experience comfort in our elegantly designed rooms with modern amenities.</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4">Book Now</button>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <img src="/images/room2.jpg" alt="Suite" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-semibold">Executive Suite</h3>
            <p className="mt-4 text-gray-600">Enjoy spacious suites with luxurious finishes and exclusive views.</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4">Book Now</button>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <img src="/images/room1.jpg" alt="Presidential Suite" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-semibold">Presidential Suite</h3>
            <p className="mt-4 text-gray-600">Top-tier luxury for the ultimate stay, complete with world-class service.</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4">Book Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
