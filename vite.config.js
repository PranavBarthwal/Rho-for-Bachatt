import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { placeBolnaCall } from "./server/bolna.js";

function bolnaCallApi() {
  const attach = (server, mode) => {
    const env = loadEnv(mode, process.cwd(), "");
    server.middlewares.use(async (req, res, next) => {
      const path = req.url?.split("?")[0];
      const profile = path === "/api/call" ? "gold" : path === "/api/referral-call" ? "referral" : null;
      if (!profile || req.method !== "POST") return next();
      try {
        const result = await placeBolnaCall(env, profile);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
          message: result.message,
          status: result.status,
          execution_id: result.execution_id,
        }));
      } catch (error) {
        res.statusCode = error.status || 502;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: error.message || "Could not place the call" }));
      }
    });
  };

  return {
    name: "bolna-call-api",
    configureServer(server) {
      attach(server, "development");
    },
    configurePreviewServer(server) {
      attach(server, "production");
    },
  };
}

export default defineConfig({
  plugins: [
    bolnaCallApi(),
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
        navigateFallbackDenylist: [/^\/api\//],
      },
    }),
  ],
  server: { port: 5173, host: "0.0.0.0" },
  preview: { port: 5173, host: "0.0.0.0" },
});
