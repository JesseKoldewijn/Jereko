const logLevels = {
  info: (...args: unknown[]) => console.info(...args),
  log: (...args: unknown[]) => console.log(...args),
  warning: (...args: unknown[]) => console.warn(...args),
  error: (...args: unknown[]) => console.error(...args),
  fatal: (...args: unknown[]) => console.error(...args),
  debug: (...args: unknown[]) => console.debug(...args),
} as const;

export default logLevels;
