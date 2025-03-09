import React from 'react';

const Carousal = () => {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/image.png)' }}>
        <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
            Welcome to Hotels
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-6 sm:mb-8">
            Experience world-class amenities and unforgettable stays.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base md:text-lg">
            Explore Our Hotels
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousal;
