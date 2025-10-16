import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// eslint-disable-next-line no-undef
const isDev = process.env?.NODE_ENV !== 'production';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: isDev ? "/" : "/admin/",
  esbuild: {
    loader: 'jsx',
  },
  server: {
    port: "4000",
    proxy: isDev ? {
      '/api': 'http://localhost:9000',
    } : {}
  },
  build: {
    outDir: './dist/',
    emptyOutDir: true
  }
})
