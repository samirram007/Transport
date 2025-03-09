import React from 'react';

const UseCases = () => {
  return (
    <section className="relative py-20 bg-white px-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
     
        <div className="relative w-full md:w-2/3 h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg">
          <img
            src="/images/usecases1.jpg"
            alt="Events and Celebrations"
            className="w-full h-full object-cover transform transition-all duration-700 hover:scale-105"
          />
        </div>

        <div className="relative w-full md:w-1/2 mt-10 md:mt-0 md:-ml-24 z-20 bg-white p-10 rounded-lg shadow-xl">
          <h2 className="text-4xl font-bold mb-8">
            Events & Celebrations
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            From corporate meetings and social gatherings to milestone celebrations, our venue offers the perfect setting for all types of events.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Our luxurious spaces, equipped with modern amenities, provide the ideal environment for business events, private parties, or any special occasion you have in mind.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 ease-in-out">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
