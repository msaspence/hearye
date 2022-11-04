import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteFaviconsPlugin } from 'vite-plugin-favicon2'
import { ssr } from 'vite-plugin-ssr/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ssr({ prerender: true }),
    ViteFaviconsPlugin('src/images/icon.png'),
  ],
})
