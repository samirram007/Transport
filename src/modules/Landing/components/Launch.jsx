import React from 'react';


const Launch = () => {
  return (
    <section className="py-16 px-10 bg-cover bg-center text-white text-center" style={{ backgroundImage: `url(/images/launch.jpg)` }}>
      <div className="bg-black bg-opacity-60 py-16">
        <h2 className="text-4xl font-bold mb-6">Launching Our New All-Inclusive Package</h2>
        <p className="text-lg mb-8">Experience the best with our exclusive all-inclusive offers.</p>
        <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition">
          Book Now
        </button>
      </div>
    </section>
  );
};

export default Launch;
