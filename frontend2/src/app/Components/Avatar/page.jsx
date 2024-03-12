'use client'
import {Dialog} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';      
import React, { useState } from 'react';

const Avatar = () => {
  const [image, setImage] = useState(null); // State to manage selected image file

  // Function to handle changes when a new image is selected
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <>
      <div className='profile_img text-center p-4'>
        <div className="flex flex-column justify-content align-item-center">
          <input
            type="file"
            accept="image/*" // Accept all image types
            onChange={handleImageChange} // Call handleImageChange function on change
          />
          {image && ( // Render the selected image if available
            <img
              src={URL.createObjectURL(image)} // Create a URL for the selected image
              alt="Avatar"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }} // Example styling for the avatar
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Avatar;
