export const base =
  typeof process.env.VERCEL_URL !== "undefined" && process.env.VERCEL_URL !== ""
    ? process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://" + process.env.VERCEL_URL
    : "http://localhost:3000";
