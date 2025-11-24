"use client";

import React from "react";
import { motion } from "motion/react";

interface Props extends React.PropsWithChildren {
  className?: string;
}

export const AnimateBubble: React.FC<Props> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0, scale: 0 }}
      animate={{ opacity: 1, height: "auto", scale: 1 }}
      // initial={{ opacity: 0, scale: 0 }}
      // animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
        type: "spring",
        bounce: 0.2,
        scale: { delay: 0.1 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
