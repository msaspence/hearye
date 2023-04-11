import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'

import { hydrateClient } from '../../../../../../renderer/hydrateClient'
import { renderApp } from './renderApp'

export const clientRouting = true
export const hydrationCanBeAborted = true

export async function render(pageContext: PageContextBuiltInClient) {
  hydrateClient(renderApp, pageContext)
}
