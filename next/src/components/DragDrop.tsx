'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type DragDropProps = {
  text: string;
  bringToFront: () => void;
  zIndex: number;
  x: number;
  y: number;
  rotationValue: number;
};

const DragDrop = ({
  text,
  bringToFront,
  zIndex,
  x,
  y,
  rotationValue,
}: DragDropProps) => {
  const [rotation, setRotation] = useState(0);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      animate={{ x, y, rotate: rotationValue + rotation }}
      // animate={{ x, y, rotate: rotationValue + rotation }}
      // style={{ position: 'absolute', zIndex }} // Se till att zIndex tillämpas här
      style={{ zIndex }} // Se till att zIndex tillämpas här
      onMouseDown={bringToFront} // Uppdatera zIndex vid klick
      onDrag={(e, info) => {
        setRotation((prev) => prev + info.delta.x / 6);
      }}
      // className="text-3xl lg:text-8xl text-center bg-decoration outline outline-2 lg:outline-4 py-2 lg:py-8 px-8 lg:px-24 inline-block rounded-full"
      className="text-3xl lg:text-8xl text-center bg-decoration outline outline-2 lg:outline-4 py-2 lg:py-8 px-8 lg:px-24 inline-block rounded-full"
    >
      {text}
    </motion.div>
  );
};

export default DragDrop;
