import React from 'react';

const Resources = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center px-10">
      
        <h2 className="text-4xl font-bold mb-10">Helpful Resources</h2>
        
     
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
          <div className="p-8 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="mb-4 text-blue-600 text-5xl">
              <i className="fas fa-map-signs"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Travel Guides</h3>
            <p className="text-gray-600">Explore our curated travel guides to help plan your stay with exclusive local tips and recommendations.</p>
          </div>

          <div className="p-8 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="mb-4 text-blue-600 text-5xl">
              <i className="fas fa-book-open"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Hotel Brochure</h3>
            <p className="text-gray-600">Download our latest brochure to explore the hotel's amenities, services, and more in a detailed PDF format.</p>
          </div>


          <div className="p-8 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="mb-4 text-blue-600 text-5xl">
              <i className="fas fa-blog"></i>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Blog</h3>
            <p className="text-gray-600">Read the latest tips and updates on our hotel services, upcoming events, and travel inspirations.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
