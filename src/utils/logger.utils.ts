import winston, { LoggerOptions, format } from "winston";

const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp: time }) => {
  return `${time} [api] ${level}: ${message}`;
});

const options: LoggerOptions = {
  format: combine(timestamp(), logFormat),
  level: "info",
  transports: [new winston.transports.Console()],
};

export const logger = winston.createLogger(options);
