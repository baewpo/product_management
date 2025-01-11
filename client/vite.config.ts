import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
	return {
		server: {
			port: 3000,
			host: "0.0.0.0",
			proxy: {
				"/api": env.VITE_API_URL,
			},
		},
		resolve: {
			alias: {
				config: path.resolve(__dirname, "src/config"),
				components: path.resolve(__dirname, "src/components"),
				src: path.resolve(__dirname, "src"),
				models: path.resolve(__dirname, "src/models"),
				contexts: path.resolve(__dirname, "src/contexts"),
				pages: path.resolve(__dirname, "src/pages"),
				routes: path.resolve(__dirname, "src/routes"),
			},
		},
		plugins: [react()],
	}})


