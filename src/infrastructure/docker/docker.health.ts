import { dockerClient } from "./docker.client.js";

export const checkDockerConnection = async (): Promise<boolean> => {
    try {
        const response: string = await dockerClient.ping();

        console.info("Docker Engine:", response);

        return true;
    } catch (error: unknown) {
        const message: string =
            error instanceof Error
                ? error.message
                : "Unknown Docker connection error.";

        console.error("Docker connection failed:", message);

        return false;
    }
};