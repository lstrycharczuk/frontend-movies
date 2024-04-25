import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const baseApiURL = process.env.BASE_API_URL|| 'http://localhost:3000'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    BASE_API_URL: JSON.stringify(baseApiURL)
  },
  build: {
    rollupOptions: {
      external: ['react-redux'],
    },
  },
})
