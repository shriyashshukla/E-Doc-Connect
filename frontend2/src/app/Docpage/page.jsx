'use client'
import React, { useEffect, useState } from 'react';
import './style.css';
import SocialCard from './SocialCard';
import userDatas from './userDatas';

const Docpage = () => {

  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDoctorData = () => {
    fetch('http://localhost:5000/doctor/getall')
      .then((result) => {
        return result.json();
      })
      .then(data => {
        console.log(data);
        setDoctorList(data)
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const displayDoctorData = () => {
    if(!loading){
      return doctorList.map(doc => (
        <SocialCard userData={doc} />
      ))
    }
  }

  return (
    <>
      <div class="search">
        <input placeholder="Search..." type="text" />
        <button type="submit" name="go">Go</button>
      </div>


      <div>

        {displayDoctorData()}
      </div>

    </>);
};

export default Docpage;
