/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    include: ["./src/**/*.test.ts?(x)"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./.coverage",
      exclude: [
        "node_modules/",

        // tests
        "src/tests/setup.ts",
        "src/**/*.test.ts?(x)",

        // configs
        ".eslintrc.cjs",
        "postcss.config.mjs",

        // app root
        "src/main.tsx",
        "src/components/App/index.ts",
      ],
    },
  },
});
