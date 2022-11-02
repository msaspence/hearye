import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteFaviconsPlugin } from 'vite-plugin-favicon2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteFaviconsPlugin('src/images/icon.png')],
})
