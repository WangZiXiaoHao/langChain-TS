import { defineConfig } from 'vite'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Ollama 服务的实际地址
        changeOrigin: true,
        // 如果 Ollama 的接口路径不需要 /api 前缀，可以在此处重写路径
         rewrite: (path) => path.replace(/^\/api/, ''), 
      }
    }
  }
})
