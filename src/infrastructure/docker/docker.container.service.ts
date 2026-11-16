import Docker from "dockerode";
import { DOCKER_SANDBOX_CONFIG } from "./docker.constants.js";
import { dockerClient } from "./docker.client.js";

export interface ICreateContainerOptions {
  image: string;
  workspacePath: string;
  containerWorkspacePath: string;
}

export class DockerContainerService {
  public async createContainer(
    options: ICreateContainerOptions,
  ): Promise<Docker.Container> {
    const container: Docker.Container = await dockerClient.createContainer({
      Image: options.image,

      Cmd: ["sleep", "infinity"],

      WorkingDir: options.containerWorkspacePath,

      User: DOCKER_SANDBOX_CONFIG.user,

      NetworkDisabled: true,

      HostConfig: {
        NetworkMode: DOCKER_SANDBOX_CONFIG.networkMode,

        Memory: DOCKER_SANDBOX_CONFIG.memory,
        MemorySwap: DOCKER_SANDBOX_CONFIG.memorySwap,

        NanoCpus: DOCKER_SANDBOX_CONFIG.nanoCpus,

        PidsLimit: DOCKER_SANDBOX_CONFIG.pidsLimit,

        ReadonlyRootfs: DOCKER_SANDBOX_CONFIG.readonlyRootfs,

        AutoRemove: DOCKER_SANDBOX_CONFIG.autoRemove,

        CapDrop: ["ALL"],

        SecurityOpt: ["no-new-privileges:true"],

        Binds: [
          `${options.workspacePath}:${options.containerWorkspacePath}`,
        ],
      },
    });

    return container;
  }
  public async startContainer(
    container:Docker.Container
  ):Promise<void>{
    await container.start()
  }

  public async stopContainer(
    container:Docker.Container
  ):Promise<void>{
    try {
        await container.stop({
            t:2
        })
    } catch (error) {
            const statusCode =
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error
        ? error.statusCode
        : undefined;

    // Container is already stopped or no longer exists.
    if (statusCode === 304 || statusCode === 404) {
      return;
    }

    throw error;
    }
  }
public async removeContainer(
  container: Docker.Container,
): Promise<void> {
  try {
    await container.remove({
      force: true,
      v: true,
    });
  } catch (error: unknown) {
    const statusCode =
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error
        ? error.statusCode
        : undefined;

    if (statusCode === 404) {
      return;
    }

    throw error;
  }
}
}

export const dockerContainerService = new DockerContainerService();