import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import swc from 'unplugin-swc'
import { cjsInterop } from 'vite-plugin-cjs-interop'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
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
