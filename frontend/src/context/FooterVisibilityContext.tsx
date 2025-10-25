// src/context/FooterVisibilityContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

interface FooterVisibilityContextValue {
  isFooterVisible: boolean;
  setFooterVisibility: (visible: boolean) => void;
}

const FooterVisibilityContext = createContext<FooterVisibilityContextValue | undefined>(undefined);

export const useFooterVisibility = () => {
  const context = useContext(FooterVisibilityContext);
  if (!context) {
    throw new Error("useFooterVisibility must be used within FooterVisibilityProvider");
  }
  return context;
};

export const FooterVisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  return (
    <FooterVisibilityContext.Provider
      value={{ isFooterVisible, setFooterVisibility: setIsFooterVisible }}
    >
      {children}
    </FooterVisibilityContext.Provider>
  );
};
