// TestimonialsPage.js
import React from 'react';
import './TestimonialsPage.css';

const TestimonialsPage = () => {
    return (
        <div className='testimonials' id='testimonials'>
            <h2>Testimonials</h2>
            <div className='container'>
                <span className='line'></span>
                <div className='content'>
                    <div className="card">
                        <img src="testimonials-1.jpg" className="card-img-top" alt="Testimonial 1"/>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn ">Go somewhere</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src="testimonials-2.jpg" className="card-img-top" alt="Testimonial 2"/>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn ">Go somewhere</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src="testimonials-3.jpg" className="card-img-top" alt="Testimonial 3"/>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn ">Go somewhere</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src="testimonials-4.jpg" className="card-img-top" alt="Testimonial 4"/>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn ">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsPage;
