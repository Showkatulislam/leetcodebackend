import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "text"]).default("development"),

    PORT: z.coerce.number().int().min(1).max(65535).default(5000),

    DATABASE_URL: z.string().min(1, "DATABASE URL is required."),

    JWT_ACCESS_SECRET: z.string().min(12, "JWT_ACCESS_SECRET must be at least 32 characters"),

    JWT_ACCESS_EXPIRES_IN: z.string().min(1).default("15m"),

    JWT_REFRESH_SECRET: z.string().min(12, "JWT_REFRESH_SECRET must be at least 32 characters"),

    JWT_REFRESH_EXPIRES_IN: z.string().min(1).default("7d"),

    CORS_ORIGIN: z.string().min(1).default("http://localhost:3000"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("❌ Invalid environment configuration:");

    console.error(parsedEnv.error.flatten().fieldErrors);

    process.exit(1);
}

const env = {
    server: {
        nodeEnv: parsedEnv.data.NODE_ENV,
        port: parsedEnv.data.PORT,
    },

    database: {
        url: parsedEnv.data.DATABASE_URL,
    },

    jwt: {
        accessSecret: parsedEnv.data.JWT_ACCESS_SECRET,
        accessExpiresIn: parsedEnv.data.JWT_ACCESS_EXPIRES_IN,

        refreshSecret: parsedEnv.data.JWT_REFRESH_SECRET,
        refreshExpiresIn: parsedEnv.data.JWT_REFRESH_EXPIRES_IN,
    },

    cors: {
        origin: parsedEnv.data.CORS_ORIGIN,
    },
};

export default env;
