"use client";

import { createContext, use, useState } from "react";

const defaultContext = {
  isMobileMenuOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsMobileMenuOpen: (_open: boolean) => {},
};

type HeaderContextType = typeof defaultContext;

const HeaderContext = createContext<HeaderContextType>(defaultContext);

const HeaderContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <HeaderContext.Provider
      value={{
        isMobileMenuOpen,
        setIsMobileMenuOpen,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
export default HeaderContextProvider;

export const useHeaderContext = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = use(HeaderContext);

  if (!setIsMobileMenuOpen) {
    throw new Error(
      "useHeaderContext must be used within a HeaderContextProvider",
    );
  }

  return {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  };
};
