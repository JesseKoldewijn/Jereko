import * as Sentry from "@sentry/nextjs";
import pino from "pino";

const { captureMessage } = Sentry;

const logger = () => {
  const logLevels: Record<Sentry.SeverityLevel, (...args: any) => void> = {
    info: (...args: any) => {
      const _logger = pino({
        level: "info",
      });
      captureMessage(args, "info");
      _logger.info(args);
    },
    log: (...args: any) => {
      const _logger = pino({
        level: "log",
      });
      captureMessage(args, "log");
      _logger.info(args);
    },
    warning: (...args: any) => {
      const _logger = pino({
        level: "warn",
      });
      captureMessage(args, "warning");
      _logger.warn(args);
    },
    error: (...args: any) => {
      const _logger = pino({
        level: "error",
      });
      captureMessage(args, "error");
      _logger.error(args);
    },
    fatal: (...args: any) => {
      const _logger = pino({
        level: "fatal",
      });
      captureMessage(args, "fatal");
      _logger.error(args);
    },
    debug: (...args: any) => {
      const _logger = pino({
        level: "debug",
      });
      captureMessage(args, "debug");
      _logger.debug(args);
    },
  };

  return logLevels;
};

const Logger = logger();

export default Logger;
