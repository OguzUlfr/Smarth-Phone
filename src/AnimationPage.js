import React from 'react'
import {motion} from 'framer-motion'


function AnimationPage({children}) {
  return (
    <motion.div 
    initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x:0 }}
    exit={{ opacity: 0 }}
    >
        {children}
    </motion.div>
  )
}

export default AnimationPage