// src/app/(marketing)/sections/visuals/BlueprintVisual.tsx
import React from "react";

const BlueprintVisual: React.FC = () => (
  <div
    className="w-full h-72 flex items-center justify-center"
    style={{
      backgroundImage: "url(/images/fingerprint_2.0.jpg)",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      pointerEvents: "none",
      userSelect: "none",
    }}
  />
);

export default BlueprintVisual;
