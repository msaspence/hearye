import { hydrateClient } from './hydrateClient'
import { renderApp } from './renderApp'
import type { ClientContext } from './types'

export const clientRouting = true
export const hydrationCanBeAborted = true

export async function render(pageContext: ClientContext) {
  hydrateClient(renderApp, pageContext)
}
