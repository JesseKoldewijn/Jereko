import { cn } from "../lib/utils";

export const animatedGradient = (overrides?: string) =>
  cn(
    overrides ?? "",
    "animate-moving-bg bg-gradient-to-bl from-blue-300 via-purple-600 to-red-400 bg-clip-text text-transparent saturate-200",
  );
