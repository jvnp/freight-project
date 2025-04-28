import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

process.loadEnvFile(".env");

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    PORT: z.number().default(5000),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: process.env,

  // emptyStringAsUndefined: true,
});
