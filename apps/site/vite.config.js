import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteFaviconsPlugin } from 'vite-plugin-favicon2'

export default defineConfig({
  plugins: [
    react(),
    process.env.BUILD_FAVICONS
      ? ViteFaviconsPlugin({ logo: 'src/images/icon.png', cache: true })
      : undefined,
  ],
  build: {
    minify: false,
  },
})
