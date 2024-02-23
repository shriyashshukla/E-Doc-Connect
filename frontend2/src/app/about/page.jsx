'use client'
import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation  } from 'framer-motion'; // Import motion from Framer Motion
import './about.css';

const About = () => {
  
  const controls = useAnimation();
  const imageContainerRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start('visible');
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    if (imageContainerRef.current) {
      observer.observe(imageContainerRef.current);
    }

    return () => {
      if (imageContainerRef.current) {
        observer.unobserve(imageContainerRef.current);
      }
    };
  }, [controls]);

 

  return (
    <>
      <motion.div
        className='container'
        initial={{ scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <div className="card3 container" id='about'>
          <div className="e-card3 playing">
            <div className="image" />
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
            <div className="infotop">
              <h3>Why Choose MedAssure?</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum repellat odit necessitatibus aliquam? </p>
              <br />
              <button>know more</button>
            </div>
          </div>
          <div class="card4">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clipboard-data" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
              <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
              <path d="M9 17v-4" />
              <path d="M12 17v-1" />
              <path d="M15 17v-2" />
              <path d="M12 17v-1" />
            </svg>
            <h5>Why Choose MedAssure?</h5>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum repellat odi</p>
            <br />
          </div>
          <div class="card4">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-microscope" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 21h14" />
              <path d="M6 18h2" />
              <path d="M7 18v3" />
              <path d="M9 11l3 3l6 -6l-3 -3z" />
              <path d="M10.5 12.5l-1.5 1.5" />
              <path d="M17 3l3 3" />
              <path d="M12 21a6 6 0 0 0 3.715 -10.712" />
            </svg>
            <h5>Why Choose MedAssure?</h5>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum repellat od </p>
            <br />
          </div>
          <div class="card4">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-motorbike" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M19 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M7.5 14h5l4 -4h-10.5m1.5 4l4 -4" />
              <path d="M13 6h2l1.5 3l2 4" />
            </svg>
            <h5>Why Choose MedAssure?</h5>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum repellat od </p>
            <br />
          </div>
        </div>
      </motion.div>

      <div className="image-container" ref={imageContainerRef}>
        <motion.img
          src="maindoc.png"
          alt=""
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }} // Delay the image animation
        />
        <motion.div
          className="content"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1 }} // Delay the text animation
        >
          <h1>helooo</h1>
          <ul>
            <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis sit, excepturi totam necessitatibus possimus alias natus fugit est et dolorum aperiam delectus. Rem repellendus reiciendis, quae architecto quo illo quisquam.</li>
            <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis ut, ullam ea, quos ex optio non voluptate quis fugit dicta, autem pariatur saepe consequuntur quaerat nostrum deleniti minus totam vitae.</li>
            <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, asperiores. Aliquid et, reiciendis consequuntur iste facere, quibusdam cumque itaque ea impedit distinctio id modi praesentium unde laborum, eos consectetur quis.</li>
          </ul>
        </motion.div>
      </div>
    </>
  );
}
export default About;
