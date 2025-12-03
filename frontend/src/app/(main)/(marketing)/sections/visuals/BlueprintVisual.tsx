// src/app/(marketing)/sections/visuals/BlueprintVisual.tsx
import React from "react";

const BlueprintVisual: React.FC = () => (
  <div
    className={`
      w-full h-72 flex items-center justify-center
      bg-center bg-no-repeat bg-contain pointer-events-none select-none
      bg-[url('/images/fingerprint_invert.png')] dark:bg-[url('/images/fingerprint-grey-2.0.png')]
    `}
  />
);

export default BlueprintVisual;
