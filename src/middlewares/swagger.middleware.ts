import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "../config/swagger.js";

export const swaggerMiddleware = [
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        explorer: true,
    }),
];
