import React from 'react';


const AboutUs = () => {
  return (
    <section className="py-32 bg-gray-100 px-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">About The Berlin Encore Hotel & Suites</h2>
          <p className="text-gray-700 mb-6">
            We are an 81-room hotel in the heart of Ohio’s Amish Country. Experience an unforgettable stay with world-class amenities
            and a warm, welcoming atmosphere.
          </p>
          <p className="text-gray-700 mb-6">
            Established in 2018, our hotel combines rustic charm with modern comforts. Whether you’re here for leisure or business,
            we’re committed to making your stay exceptional.
          </p>
        </div>
        <div>
          <img src="/images/launch.jpg" alt="Hotel Exterior" className="w-full h-full object-cover rounded-md" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
