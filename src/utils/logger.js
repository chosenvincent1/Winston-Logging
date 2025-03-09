
import winston from "winston";

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize } = format;

// Define custom log levels and colors
const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    fatal: "red",
    error: "yellow",
    warn: "blue",
    info: "cyan",
    debug: "magenta",
  },
};

// Apply colors to Winston
winston.addColors(customLevels.colors);

// Create the logger
const logger = createLogger({
  levels: customLevels.levels,
  level: "debug", // Default log level
  format: combine(
    colorize({ all: true }), // Apply colors to all logs
    timestamp(),
    printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
