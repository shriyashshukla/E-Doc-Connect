'use client'
import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './styles.css';

const Features = () => {
  const controls = useAnimation();
  const containerRef = useRef(null);

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
        threshold: 0.5, // Change this threshold as needed
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [controls]);

  return (
    <>
      <div id="features" ref={containerRef}>


        <div className="featureContainer" ref={containerRef} id="card5">

          <motion.div

            animate={controls}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.1 }}
          ><h1>Our Features</h1></motion.div>

          <motion.div
            className="card5"
            animate={controls}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <p className="card5-title">Product Name</p>
            <p className="small-desc">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat veritatis nobis saepe itaque rerum
              nostrum aliquid obcaecati odio officia deleniti. Expedita iste et illum, quaerat pariatur consequatur eum
              nihil itaque!
            </p>
            <div className="go-corner">
              <div className="go-arrow">→</div>
            </div>
          </motion.div>
          <motion.div
            className="card5"
            animate={controls}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <p className="card5-title">Product Name</p>
            <p className="small-desc">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat veritatis nobis saepe itaque rerum
              nostrum aliquid obcaecati odio officia deleniti. Expedita iste et illum, quaerat pariatur consequatur eum
              nihil itaque!
            </p>
            <div className="go-corner">
              <div className="go-arrow">→</div>
            </div>
          </motion.div>
          <motion.div
            className="card5"
            animate={controls}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
          >
            <p className="card5-title">Product Name</p>
            <p className="small-desc">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat veritatis nobis saepe itaque rerum
              nostrum aliquid obcaecati odio officia deleniti. Expedita iste et illum, quaerat pariatur consequatur eum
              nihil itaque!
            </p>
            <div className="go-corner">
              <div className="go-arrow">→</div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Features;
