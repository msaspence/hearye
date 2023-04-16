import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'

export type ClientContext = PageContextBuiltInClient & {
  pageProps: Record<string, unknown>
  routeParams: Record<string, unknown>
  exports: Record<string, unknown>
}
