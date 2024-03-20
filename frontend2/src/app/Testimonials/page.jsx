// TestimonialsPage.js
import React from 'react';
import './TestimonialsPage.css';

const TestimonialsPage = () => {
  // Define an array of image paths
  const imagePaths = [
    "testimonials-1.jpg",
    "testimonials-2.jpg",
    "testimonials-3.jpg",
    "testimonials-4.jpg",
  ];
    return (
        // <div className='testimonials' id='testimonials'>
        //     <div className='container'>
        //         <span className='line'></span>
        //         <div className='content'>
        //             <div className="card1">
        //                 <img src="testimonials-1.jpg" className="card-img-top" alt="Testimonial 1"/>
        //                 <div className="card-body">
        //                     <h5 className="card-title">Special title treatment</h5>
        //                     <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        //                     <a href="#" className="btn ">Go somewhere</a>
        //                 </div>
        //             </div>
        //             <div className="card1">
        //                 <img src="testimonials-2.jpg" className="card-img-top" alt="Testimonial 2"/>
        //                 <div className="card-body">
        //                     <h5 className="card-title">Special title treatment</h5>
        //                     <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        //                     <a href="#" className="btn ">Go somewhere</a>
        //                 </div>
        //             </div>
        //             <div className="card1">
        //                 <img src="testimonials-3.jpg" className="card-img-top" alt="Testimonial 3"/>
        //                 <div className="card-body">
        //                     <h5 className="card-title">Special title treatment</h5>
        //                     <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        //                     <a href="#" className="btn ">Go somewhere</a>
        //                 </div>
        //             </div>
        //             <div className="card1">
        //                 <img src="testimonials-4.jpg" className="card-img-top" alt="Testimonial 4"/>
        //                 <div className="card-body">
        //                     <h5 className="card-title">Special title treatment</h5>
        //                     <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        //                     <a href="#" className="btn ">Go somewhere</a>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <>
         <div className="text-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-5">Testimonials</h1>
      <div className="flex flex-wrap justify-center gap-5">
        {[...Array(4).keys()].map((index) => (
          <div key={index} className="card flex flex-col justify-between max-w-sm mx-auto">
            <div className="header flex justify-between gap-4">
              <div>
                <a className="title" href="#">
                  Building a SaaS product as a software developer
                </a>
                <p className="name">By John Doe</p>
              </div>
              <img className="image h-12 w-12 rounded-full" src={imagePaths[index]} alt="Author's Image" />
            </div>
            <p className="description">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum
              provident a, ipsa maiores deleniti consectetur nobis et eaque.
            </p>
            <dl className="post-info flex justify-between gap-4">
              <div className="cr">
                <dt className="dt">Published</dt>
                <dd className="dd">31st June, 2021</dd>
              </div>
              <div className="cr">
                <dt className="dt">Reading time</dt>
                <dd className="dd">3 minute</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
    <a href="/addTestimonials">
    <button className="py-4 px-10 rounded-full cursor-pointer border-0 bg-white shadow-md uppercase text-base font-medium tracking-wide transition-all duration-500 ease-in-out hover:tracking-widest hover:bg-blue-500 hover:text-black focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 active:transform active:translate-y-1 block mx-auto">Add our Testimonials</button>

</a>
      </>

    );
};

export default TestimonialsPage;
