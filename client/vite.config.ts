import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 3000,
		proxy: {
			"/api": "http://localhost:8080",
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
})
