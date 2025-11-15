"use client";

import React from "react";
import {
  BlankBoxSvg,
  GreyTickSvg,
  BlackTickSvg,
  LightBlueTickSvg,
  DarkBlueTickSvg,
  BlankBoxBlackBorderSvg
} from './svgs';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  // New props to control SVG display
  showBlankBox?: boolean;
  showGreyTick?: boolean;
  showBlackTick?: boolean;
  showLightBlueTick?: boolean;
  showDarkBlueTick?: boolean;
  showBlankBoxBlackBorder?: boolean;
  // Hover state from parent
  isHovered?: boolean;
  // Additional state flags
  isFirstTimeSelection?: boolean;
  isFirstTimeUnselection?: boolean;
  hasBeenSelectedBefore?: boolean;
  isTransitioning?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  showBlankBox = false,
  showGreyTick = false,
  showBlackTick = false,
  showLightBlueTick = false,
  showDarkBlueTick = false,
  showBlankBoxBlackBorder = false,
  isHovered = false,
  isFirstTimeUnselection = false,
  hasBeenSelectedBefore = false,
  isTransitioning = false
}) => {

  const getCurrentSVG = () => {
    // If specific SVG flags are provided, use them (highest priority)
    if (showBlankBox) return <BlankBoxSvg />;
    if (showGreyTick) return <GreyTickSvg />;
    if (showBlackTick) return <BlackTickSvg />;
    if (showLightBlueTick) return <LightBlueTickSvg />;
    if (showDarkBlueTick) return <DarkBlueTickSvg />;
    if (showBlankBoxBlackBorder) return <BlankBoxBlackBorderSvg />;
    
    // Otherwise, use the complex logic based on state
    if (checked) {
      if (isTransitioning) {
        return <LightBlueTickSvg />;
      } else if (isHovered) {
        if (isFirstTimeUnselection) {
          return <LightBlueTickSvg />;
        } else {
          return <BlankBoxSvg />;
        }
      } else {
        return <DarkBlueTickSvg />;
      }
    } else {
      if (isHovered) {
        if (!hasBeenSelectedBefore) {
          return <GreyTickSvg />;
        } else {
          return <BlankBoxBlackBorderSvg />;
        }
      } else {
        if (isTransitioning) {
          return <BlackTickSvg />;
        } else if (!hasBeenSelectedBefore) {
          return <BlankBoxSvg />;
        } else {
          return <BlankBoxBlackBorderSvg />;
        }
      }
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />
      <div className="w-[23px] h-[23px] flex items-center justify-center transition-all">
        {getCurrentSVG()}
      </div>
    </label>
  );
};

export default Checkbox;
