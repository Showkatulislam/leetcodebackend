import swaggerJSDoc from "swagger-jsdoc";

import env from "./env.js";

const swaggerDefinition: swaggerJSDoc.SwaggerDefinition = {
    openapi: "3.0.3",

    info: {
        title: "Online Judge API",
        version: "1.0.0",
        description: "Production-grade REST API for an online judge platform.",
    },

    servers: [
        {
            url: `http://localhost:${env.server.port}/api/v1`,
            description: "Development server",
        },
    ],

    components: {
        schemas: {
            ApiErrorResponse: {
                type: "object",
                required: ["success", "message"],
                properties: {
                    success: {
                        type: "boolean",
                        example: false,
                    },

                    message: {
                        type: "string",
                        example: "Validation failed",
                    },

                    errorCode: {
                        type: "string",
                        example: "VALIDATION_ERROR",
                    },

                    details: {
                        type: "array",
                        items: {
                            type: "object",
                        },
                    },
                },
            },
        },

        responses: {
            ValidationError: {
                description: "Validation failed",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ApiErrorResponse",
                        },
                    },
                },
            },

            RateLimitExceeded: {
                description: "Too many requests",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ApiErrorResponse",
                        },
                    },
                },
            },
        },
    },

    tags: [
        {
            name: "Health",
            description: "Application health endpoints",
        },
        {
            name: "Auth",
            description: "Authentication endpoints",
        },
        {
            name: "Users",
            description: "User management endpoints",
        },
        {
            name: "Problems",
            description: "Problem management endpoints",
        },
        {
            name: "Tags",
            description: "Problem tag endpoints",
        },
    ],
};

export const swaggerSpec = swaggerJSDoc({
    definition: swaggerDefinition,

    apis: ["./src/modules/**/*.route.ts", "./src/modules/**/*.controller.ts"],
});
