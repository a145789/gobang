import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unocss({
      safelist: ['bg-#000', 'bg-#fff']
    })
  ],
  base: './',
  server: {
    host: '0.0.0.0'
  }
})
