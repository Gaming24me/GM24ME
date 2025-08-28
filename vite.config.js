import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Set the base path for GitHub Pages deployment
  // Replace 'yourusername' with your actual GitHub username
  // and 'repository-name' with your actual repository name
  base: mode === 'production' ? '/portfolio-client/' : '/',
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  }
}))


