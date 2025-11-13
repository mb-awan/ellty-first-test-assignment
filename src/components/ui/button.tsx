"use client";
import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <div className="w-[340px] mx-auto">
      <motion.button
        whileTap={{ scale: 0.97, opacity: 0.8 }}
        onClick={onClick}
        className="w-full bg-[#FFCE22] h-10 text-[#1F2128] font-[14px] leading-[130%] tracking-0 px-2.5 rounded-md shadow-sm hover:opacity-90 transition-all duration-200 mt-5 box-border"
      >
        {label}
      </motion.button>
    </div>
  );
};

export default Button;
