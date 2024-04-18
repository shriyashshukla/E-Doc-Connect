'use client'
import React, { useEffect, useState } from 'react';
import './style.css';
import SocialCard from './SocialCard';
import userDatas from './userDatas';

const Docpage = () => {

  const [doctorList, setDoctorList] = useState([]);
  const [filteredDoctorList, setFilteredDoctorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchDoctorData = () => {
    setLoading(true);
    fetch('http://localhost:5000/doctor/getall')
      .then((result) => {
        return result.json();
      })
      .then(data => {
        console.log(data);
        setDoctorList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchDoctorData();
  }, []);

  useEffect(() => {
    // Filter doctor list based on search query
    const filteredList = doctorList.filter(doc =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoctorList(filteredList);
  }, [searchQuery, doctorList]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const displayDoctorData = () => {
    if (!loading) {
      return filteredDoctorList.map(doc => (
        <SocialCard key={doc.id} userData={doc} />
      ))
    }
  }

  return (
    <>
    <div className="search">
      <input
        placeholder="Search..."
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button type="submit" name="go">Go</button>
    </div>

    <div className="mt-6 justify-center flex flex-wrap gap-4">
      {displayDoctorData()}
    </div>
  </>
);
};

export default Docpage;