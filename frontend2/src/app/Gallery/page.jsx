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
    
    
    // Add more image URLs as needed
  ];

  return (
    <div>
      <h2>Gallery</h2>
      <div style={galleryStyle}>
        {imageUrls.map((imageUrl, index) => (
          <div key={index} style={gridItemStyle}>
            <img src={imageUrl} alt={`Image ${index + 1}`} style={imageStyle} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const galleryStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // Adjust the number of columns as needed
  gap: '16px', // Adjust the gap between grid items
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
};

export default Gallery;
