"use client";

// drop console.error if args include "Warning: Accessing element.ref was removed in React 19"
const originalError = console.error;
console.error = (...args) => {
  if (
    args[0].includes("Warning: Accessing element.ref was removed in React 19")
  ) {
    return;
  }
  originalError(...args);
};
