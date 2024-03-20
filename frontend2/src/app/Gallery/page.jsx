import React from 'react';

const Gallery = () => {
  // Sample image URLs
  const imageUrls = [
    'gallery-1.jpg',
    'gallery-2.jpg',    
    'gallery-3.jpg',
    'gallery-4.jpg',
    'gallery-5.jpg',
    'gallery-6.jpg',
    'gallery-7.jpg',
    'gallery-8.jpg',
    'gallery-9.jpg',
    'gallery-10.jpg',
    // Add more image URLs as needed
  ];

  return (
    <>
      <h1 className="text-3xl md:text-4xl lg:text-5xl">Our Gallery</h1>
      <p className="px-4 py-2 text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga nam ipsa sapiente consequatur dolores deserunt quia! Perspiciatis iure commodi ea incidunt accusamus, voluptates sed similique, consequatur exercitationem amet aperiam non!</p>
      <div className="mx-5 my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {imageUrls.map((imageUrl, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md">
              <img src={imageUrl} alt={`Image ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};



const galleryStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Adjust the minimum and maximum width of grid items
  gap: '20px', // Adjust the gap between grid items
};

const gridItemStyle = {
  overflow: 'hidden',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '8px', // Add border radius to images to match grid item
};



export default Gallery;
