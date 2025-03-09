import React, { useState } from 'react';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message sent:", { name, email, message });

  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Your Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Write your message"
                  rows="6"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              >
                Send Message
              </button>
            </form>
          </div>


          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Hotel Address</h3>
              <p className="text-gray-600">123 Luxury St, Paradise City, Country</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
              <p className="text-gray-600">+123 456 7890</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">contact@luxuryhotel.com</p>
            </div>
            <div className="mt-8">
              <iframe
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7366.122705553758!2d88.43844475!3d22.614183999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89e2af186e239%3A0xcfa8c7d5bd7403f7!2sHela%20Battala%2C%20Sukanta%20Pally%2C%20Rajarhat%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1729525669829!5m2!1sen!2sin" 
               width="100%"
                height="300"
                style={{ border: '0' }}
                allowFullScreen=""
                loading="lazy"
                title="Hotel Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
