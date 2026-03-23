export const base =
  typeof window !== "undefined"
    ? window.location.origin
    : typeof import.meta.env?.SITE === "string"
      ? new URL(import.meta.env.SITE).origin
      : "https://jereko.dev";
