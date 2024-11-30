// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import react from "@astrojs/react";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".astro"],
    },
  },
  output: 'static',
  integrations: [react()],
});
