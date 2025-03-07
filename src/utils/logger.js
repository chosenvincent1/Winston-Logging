
import winston from "winston";

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize } = format;

// Define custom log levels and colors
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "cyan",
    verbose: "blue",
    debug: "magenta",
  },
};

// Apply colors to Winston
winston.addColors(customLevels.colors);

// Create the logger
const logger = createLogger({
  levels: customLevels.levels,
  level: "info", // Default log level
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
