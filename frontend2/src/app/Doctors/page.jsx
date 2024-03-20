import React from 'react';
import './style.css';

const Page = () => {
  return (
    <>
      <div class='heading py-4  text-center' id='Doctors'>
  <h1 class="text-3xl md:text-4xl lg:text-5xl">Our Doctors</h1>
</div>
<p class="px-4 py-2 text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga nam ipsa sapiente consequatur dolores deserunt quia! Perspiciatis iure commodi ea incidunt accusamus, voluptates sed similique, consequatur exercitationem amet aperiam non!</p>


      <div className="page-background" style={{ position: 'relative' }}>


        <img src="aboutpg.jpg" alt="A person sitting on a bench" className="page-image" style={{ width: '100%', height: 'auto' }} />

        <div className="doc-container" id='Doctors'>
          <div className="my-cards">
            <div className="my-cards-info">
              <div className="" />
              <img className='my-cards-avatar' src="doctors-4.jpg" alt="" />
              <div className="my-cards-title">Dr.Aisha Khan</div>
              <div className="my-cards-subtitle">Medical Director</div>
            </div>
           
          </div>
          <div className="my-cards">
            <div className="my-cards-info">
              <div className="" />
              <img className='my-cards-avatar' src="1.jpeg" alt="" />
              <div className="my-cards-title">Dr.Vikram Sharma</div>
              <div className="my-cards-subtitle">Director of Clinical Research</div>
            </div>
            
          </div>
          <div className="my-cards">
            <div className="my-cards-info">
              <div className="" />
              <img className='my-cards-avatar' src="doctor-6.jpg" alt="" />
              <div className="my-cards-title">Dr.Deepika Singh</div>
              <div className="my-cards-subtitle">Consultant Gynecologist</div>
            </div>
           
          </div>
          <div className="my-cards">
            <div className="my-cards-info">
              <div className="" />
              <img className='my-cards-avatar' src="3.jpeg" alt="" />
              <div className="my-cards-title">Dr.Ayush Maurya</div>
              <div className="my-cards-subtitle">CEO &amp; Co-Founder</div>
            </div>
           
          </div>
          <div className="my-cards">
            <div className="my-cards-info">
              <div className="" />
              <img className='my-cards-avatar' src="4.jpeg" alt="" />
              <div className="my-cards-title">Dr.Karthik Reddy</div>
              <div className="my-cards-subtitle">CEO &amp; Co-Founder</div>
            </div>
            
          </div>
          <div className="my-cards">
            <div className="my-cards-info">
              <div className="" />
              <img className='my-cards-avatar' src="doctors-4.jpg" alt="" />
              <div className="my-cards-title">Dr. Priya Patel</div>
              <div className="my-cards-subtitle">Chief Medical Officer</div>
            </div>
            
          </div>
          <div className="my-cards">
            <div className="my-cards-info">
              <div className="" />
              <img className='my-cards-avatar' src="2.jpeg" alt="" />
              <div className="my-cards-title">Dr.Ajay Verma</div>
              <div className="my-cards-subtitle">Professor of Surgery</div>
            </div>
            
          </div>


        </div>
        <div class="my-container">
        <a href="Docpage">
          <button className='nav-butt hover-button'>Our Doctors</button>
          </a>
        </div>


      </div>

    </>
  );
};

export default Page;
