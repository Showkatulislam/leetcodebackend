export const DOCKER_SANDBOX_CONFIG = {
  networkMode: "none",

  memory: 256 * 1024 * 1024,
  memorySwap: 256 * 1024 * 1024,

  nanoCpus: 1_000_000_000,

  pidsLimit: 64,

  user: "1000:1000",

  readonlyRootfs: true,

  autoRemove: false,
} as const;