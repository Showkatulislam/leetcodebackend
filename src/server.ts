import app from "./app.js";
import env from "./config/env.js";
import { logger } from "./lib/logger.js";

const PORT = 5000;

app.listen(PORT, () => {
    logger.info({
        port:env.server.port,
        environment:env.server.nodeEnv
    },
    "Server started."
)
});
