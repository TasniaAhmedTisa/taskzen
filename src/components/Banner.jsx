import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <div className="w-full relative overflow-hidden shadow-lg h-64 sm:h-80 md:h-96 lg:h-[450px] xl:h-[550px]">
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover brightness-50"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/yFHRHnCj/task-management.jpg')",
        }}
      ></div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex flex-col justify-center items-center text-center px-4"
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg text-white font-serif">
          Stay Organized, Stay Productive
        </h1>
        <p className="text-sm md:text-lg lg:text-xl m-3 drop-shadow-md text-white font-bold font-serif">
          Manage your tasks efficiently with TaskZen. Plan, track, and achieve your goals seamlessly.
        </p>
        
       
      </motion.div>
    </div>
  );
};

export default Banner;
