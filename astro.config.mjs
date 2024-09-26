import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), svelte()],
  site: "http://localhost:3000",
  base: "/",
});