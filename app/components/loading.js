import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const UltimateLoading = () => {
  const circleCount = 5;
  const controls = useAnimation();
  const containerRef = useRef(null);

  useEffect(() => {
    const sequence = async () => {
      await controls.start(i => ({
        scale: [1, 1.5, 1],
        opacity: [0.3, 1, 0.3],
        transition: { 
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: i * 0.15
        }
      }));
    };
    sequence();
  }, [controls]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (containerRef.current) {
        const { clientX, clientY } = event;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        containerRef.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div 
        ref={containerRef}
        className="relative w-64 h-64 transition-transform duration-300 ease-out"
      >
        {[...Array(circleCount)].map((_, index) => (
          <motion.div
            key={index}
            custom={index}
            animate={controls}
            className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8"
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 blur-md"></div>
              <div className="absolute inset-1 rounded-full bg-white shadow-lg flex justify-center items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="absolute inset-0 flex justify-center items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full border-4 border-blue-300 border-t-blue-500"
          ></motion.div>
        </div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute inset-0 flex justify-center items-center text-blue-500 font-bold text-xl"
        >
          Loading...
        </motion.div>
      </div>
    </div>
  );
};

export default UltimateLoading;