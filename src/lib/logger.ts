import pino, { type LoggerOptions } from "pino";
import env from "../config/env.js";

const pinoOptions: LoggerOptions = {
  level: env.server.nodeEnv === "production" ? "info" : "debug",

  ...(env.server.nodeEnv === "development" && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    },
  }),

  base: {
    service: "leetcode-backend",
  },

  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "password",
      "token",
      "accessToken",
      "refreshToken",
      "jwt",
      "*.password",
      "*.token",
    ],
    censor: "[REDACTED]",
  },
};

export const logger = pino(pinoOptions);