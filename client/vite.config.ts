import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const AI_AGENT_TARGET =
  "https://aiagent-service2-608887190314.us-central1.run.app";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiKey = env.AI_AGENT_API_KEY ?? "";

  const proxyConfig = {
    "/api/ai-agent": {
      target: AI_AGENT_TARGET,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api\/ai-agent/, ""),
      headers: apiKey ? { "X-API-KEY": apiKey } : undefined,
    },
  };

  return {
    plugins: [react()],
    server: {
      proxy: proxyConfig,
    },
    preview: {
      proxy: proxyConfig,
    },
  };
});
