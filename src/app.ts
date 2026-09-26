import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/index.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { requestLogger } from "./middlewares/request-logger.middleware.js";
import env from "./config/env.js";
import { globalRateLimiter } from "./middlewares/rate-limit.middleware.js";

const app = express();

if (env.server.nodeEnv === "production") {
    app.set("trust proxy", 1);
}

app.use(requestLogger);

app.use(
    helmet({
        contentSecurityPolicy: env.server.nodeEnv === "production",
        crossOriginEmbedderPolicy: false,
    }),
);

app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

app.use(
    express.json({
        limit: "1md",
    }),
);

app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use(cookieParser());

app.use(globalRateLimiter);

app.use("/api/v1", apiRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
    });
});

export default app;
