"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface AnimatedIconProps {
  Icon: LucideIcon;
  className?: string;
  color?: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  Icon,
  className = "",
  color,
}) => {
  return (
    <div className="transition-transform duration-300 hover:animate-shake">
      <Icon
        className={`w-8 h-8 ${className}`}
        style={{
          color: color || "#ffffff",
          filter: "brightness(1)", // Ensure icons are visible
        }}
      />
    </div>
  );
};

export default AnimatedIcon;
