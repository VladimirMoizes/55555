// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'http://cityls.ru',
  base: '/',
  output: 'static',
  build: {
    assets: '_astro',
  },
});
