"use client";

import { createContext, useContext, useState } from "react";

// Define the shape of the context value
interface LocaleContextValue {
  locale: string;
  setLocale: (locale: string) => void;
}

// Create the context
const LocaleContext = createContext<LocaleContextValue>({
  locale: "en-US",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLocale: () => {},
});

// Define the props for the provider component
interface LocaleProviderProps {
  defaultLang?: string;
  children: React.ReactNode;
}

// Define the provider component
export function LocaleProvider({ defaultLang, children }: LocaleProviderProps) {
  const [locale, setLocale] = useState(defaultLang ?? "en-US");

  // Define the context value
  const value: LocaleContextValue = {
    locale: locale ?? defaultLang,
    setLocale,
  };

  // Render the provider with the context value and children
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

// Define a custom hook to consume the context
export function useLocale() {
  const { locale, setLocale } = useContext(LocaleContext);
  return { locale, setLocale };
}
