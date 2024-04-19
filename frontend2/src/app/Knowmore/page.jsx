// pages/know-more.js
"use client"
// pages/know-more.js
// pages/know-more.js

import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function KnowMore() {
  const [isVisible, setIsVisible] = useState(false);

  const services = [
    {
      title: 'Telemedicine',
      description: 'Consult with doctors remotely from the comfort of your home.',
      image: 'gallery-8.jpg', // Updated image path
      
    },
    {
      title: '24/7 Support',
      description: 'Get round-the-clock assistance whenever you need it.',
      image: 'gallery-9.jpg', // Updated image path
      
    },
    {
      title: 'Secure & Private',
      description: 'Your data and consultations are secure and private.',
      image: 'gallery-10.jpg', // Updated image path
      
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative">
      <Head>
        <title>Know More - eDoctor Connect</title>
      </Head>

      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('checkup.jpg')" }}></div>

      <main className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-center mb-12">Know More About Our Services</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md p-6 text-center transform transition-all ${
                isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
              } duration-1000 ease-in-out delay-${index}`}
            >
              <div className={`${service.color} rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4`}>
                <img src={service.image} alt={service.title} className="w-20 h-20 object-cover rounded-full" /> {/* Updated image tag */}
              </div>
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 leading-relaxed">
            We are committed to providing you with the best healthcare solutions. With our team of experienced doctors
            and advanced technology, you can trust us to take care of your health needs.
          </p>
        </div>
      </main>
    </div>
  );
}
