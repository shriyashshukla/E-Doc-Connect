'use client'
import {Dialog} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';      
import React from 'react'
import { useState, useEffect } from 'react';

const Avatar= () => {
  const [image, setimage] = useState('');
  return (
    <>
    <div className='profile_img text center p-4'>
      <div className="flex flex colum justify-content align-item-center">

        <Input 
        type="file"
        accept="/image/"
        onChange={()}

        />
      </div>


    </div>
    </>
  )
}

export default Avatar