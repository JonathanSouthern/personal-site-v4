import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "#velite": fileURLToPath(new URL("./.velite", import.meta.url)),
    },
  },
  test: {
    include: ["src/**/*.test.ts"],
  },
});
