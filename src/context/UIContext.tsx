import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface UIContextType {
  isZoomed: boolean;
  setIsZoomed: (zoomed: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <UIContext.Provider value={{ isZoomed, setIsZoomed }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
