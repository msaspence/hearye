import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'

// Not sure why this import can't be found in eslint, but it works fine otherwise
// eslint-disable-next-line import/no-unresolved
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
