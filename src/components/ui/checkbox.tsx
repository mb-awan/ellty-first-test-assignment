"use client";

import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />
      <div className={`w-[23px] h-[23px] border rounded-md flex items-center justify-center transition-all
        ${checked ? "bg-blue-600 border-blue-600" : "border-gray-300 bg-white"}
      `}>

        {/* ⚪ Gray tick (on hover, only when not checked) */}
        {!checked && (
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1_200)">
              <rect width="25" height="25" rx="6" fill="white" />
              <rect x="0.5" y="0.5" width="24" height="24" rx="5.5" stroke="#BDBDBD" />
              <path d="M4 12.6L10.0345 17.9672C10.055 17.9854 10.0863 17.9837 10.1047 17.9635L21 6" stroke="#E3E3E3" stroke-linecap="round" />
            </g>
            <defs>
              <clipPath id="clip0_1_200">
                <rect width="25" height="25" rx="6" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
        
        {checked && (
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="25" height="25" rx="6" fill="#2469F6" />
            <path d="M4 12.6L10.0345 17.9672C10.055 17.9854 10.0863 17.9837 10.1047 17.9635L21 6" stroke="white" stroke-linecap="round" />
          </svg>
        )}
      </div>
    </label>
  );
};

export default Checkbox;
