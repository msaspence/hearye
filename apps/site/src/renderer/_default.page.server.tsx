import type { PageContextBuiltIn } from 'vite-plugin-ssr'

import { renderServer } from './renderServer'
import { renderApp } from './renderApp'

export const passToClient = ['pageProps', 'routeParams']

export async function render(
  pageContext: PageContextBuiltIn & { pageProps: Record<string, unknown> }
) {
  return {
    documentHtml: await renderServer(renderApp, pageContext),
  }
}
