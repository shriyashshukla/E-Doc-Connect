import React from 'react'
import './style.css'

const Admin = () => {
  return (
    
    <>
    <div class="cards mycontainer">
      <a href="/addservices" className='nounderline'>
    <div class="card red">
        <p class="tip">Add Home Services</p>
       
    </div>
    </a>
    <a href="/adddoctor" className='nounderline'>
    <div class="card blue">
        <p class="tip">Add Doctors list</p>
       
    </div>
    </a>

    <a href="/editprofile" className='nounderline'>
    <div class="card green">
        <p class="tip">Edit or Remove Doctors</p>
        
    </div>
    </a>
    <a href="/admincalandar" className='nounderline'>
    <div class="card yellow">
        <p class="tip">Add Date for Appointment Booking</p>
       
    </div>
    </a>
</div>


    </>
  )
}

export default Admin