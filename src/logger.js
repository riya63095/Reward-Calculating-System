import pino from "pino";

const logger = pino({
  level: "info",
  browser: {
    serialize: true,
    asObject: true,
  },
  base: {
    env: process.env.NODE_ENV,
    version: "1.0.0",
  },
});

export default logger;
