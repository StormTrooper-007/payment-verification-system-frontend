import React from 'react'
import {motion} from "framer-motion"
import "./App.css"

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
        repeatDelay:0.1, loop:Infinity, duration: 1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

export default function PageLoader() {
  return (
    <motion.ul
    className="container"
    variants={container}
    initial="hidden"
    animate="visible"
    >
        {[0, 1, 2, 3].map((index) => (
      <motion.li key={index} className="item" variants={item} />
    ))}
        
    </motion.ul>
  )
}
