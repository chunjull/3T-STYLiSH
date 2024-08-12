import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'public', 
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        home: 'public/home.html',
        main: 'public/index.html',
      },
    },
  }
})