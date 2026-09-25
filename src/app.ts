import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/index.js";

const app = express();

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

app.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
    });
});

export default app;
