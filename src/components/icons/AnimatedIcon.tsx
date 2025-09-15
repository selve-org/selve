"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface AnimatedIconProps {
  Icon: LucideIcon;
  className?: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  Icon,
  className = "",
}) => {
  return (
    <Icon
      className={`w-8 h-8 text-white transition-transform duration-300 hover:animate-shake ${className}`}
    />
  );
};

export default AnimatedIcon;
