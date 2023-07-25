import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:3001",
  integrations: [
    partytown(),
    sitemap({
      changefreq: "weekly",
      lastmod: new Date(),
    }),
  ],
  experimental: {
    assets: true,
  },
  build: {
    inlineStylesheets: "always",
  },
});
