import React from 'react';
import { FaConciergeBell, FaSwimmingPool, FaSpa } from 'react-icons/fa';

const Features = () => {
  return (
    <section className="py-16 bg-gray-100 px-10">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Our Exclusive Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaConciergeBell className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">24/7 Concierge</h3>
            <p className="mt-4 text-gray-600">Our dedicated team is available to assist you anytime.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaSwimmingPool className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">Luxury Pool</h3>
            <p className="mt-4 text-gray-600">Enjoy breathtaking views from our temperature-controlled pool.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <FaSpa className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">World-Class Spa</h3>
            <p className="mt-4 text-gray-600">Indulge in relaxation with premium spa treatments.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
