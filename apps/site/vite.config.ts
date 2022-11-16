import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import swc from 'unplugin-swc'
import { cjsInterop } from 'vite-plugin-cjs-interop'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ssr({ prerender: true }),
    cjsInterop({
      dependencies: ['@mui/material/*'],
    }),
  ],
  build: {
    target: 'esnext',
  },
})
