import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "icons/favicon.ico",
        "icons/apple-touch-icon.png",
        "fonts/*.ttf",
        "assets/*.png",
        "home/*",
      ],
      manifest: {
        name: "Bachatt",
        short_name: "Bachatt",
        description: "Bachatt savings home, Insta Fund, and Refer & Earn.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#F6F3FE",
        theme_color: "#F6F3FE",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,svg,ttf,webmanifest}"],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        navigateFallback: "/index.html",
      },
    }),
  ],
  server: { port: 5173, host: "0.0.0.0" },
  preview: { port: 5173, host: "0.0.0.0" },
});
