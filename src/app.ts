import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
    });
});

export default app;
