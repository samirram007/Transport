import React from 'react';
import { FaHotel, FaUtensils, FaShuttleVan } from 'react-icons/fa';

const Services = () => {
  return (
    <section className="py-16 px-10" >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaHotel className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">Luxury Rooms</h3>
            <p className="mt-4 text-gray-600">Elegantly designed rooms for a perfect stay.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaUtensils className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">Fine Dining</h3>
            <p className="mt-4 text-gray-600">Award-winning gourmet cuisine from top chefs.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaShuttleVan className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">Free Shuttle</h3>
            <p className="mt-4 text-gray-600">Complimentary shuttle service for all guests.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
