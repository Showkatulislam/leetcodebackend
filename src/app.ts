import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/index.js";
import { notFoundMiddleware } from "./middlewares/not-found.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { requestLogger } from "./middlewares/request-logger.middleware.js";

const app = express();

app.use(requestLogger)


app.use(helmet());

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);


app.use(
    express.json({
        limit: "1md",
    }),
);

app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use(cookieParser());

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
