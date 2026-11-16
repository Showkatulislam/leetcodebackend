import Docker from "dockerode";

const dockerSocketPath: string =
    process.platform === "win32"
        ? "//./pipe/docker_engine"
        : "/var/run/docker.sock";

export const dockerClient = new Docker({
    socketPath: dockerSocketPath,
});