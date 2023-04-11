import type { PageContextBuiltIn } from 'vite-plugin-ssr'
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'

import { App } from '../App'

export function renderApp({
  Page,
  pageProps,
  routeParams,
}: (PageContextBuiltIn | PageContextBuiltInClient) & {
  pageProps: Record<string, unknown>
  routeParams: Record<string, unknown>
  exports: Record<string, unknown>
}) {
  return (
    <App>
      <Page {...(pageProps || {})} routeParams={routeParams} />
    </App>
  )
}
