import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import path from "path"

// https://astro.build/config
export default defineConfig({
  integrations: [react(), svelte()],
  site: "http://localhost:3000",
  base: "/",

  vite: {
    alias: {
      "@": path.resolve(path.dirname(""), "./src")
    }
  }
});