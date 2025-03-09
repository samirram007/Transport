import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-12  px-10">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">What Our Guests Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <p className="italic text-gray-600">"This is the best hotel I've ever stayed at! The service was exceptional, and the amenities were top-notch."</p>
            <h4 className="mt-4 font-semibold">– John Doe</h4>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <p className="italic text-gray-600">"A truly luxurious experience! Everything was perfect, from the food to the facilities."</p>
            <h4 className="mt-4 font-semibold">– Jane Smith</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
