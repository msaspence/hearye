import type { PageContextBuiltIn } from 'vite-plugin-ssr'

import { renderServer } from '../../../../../../renderer/renderServer'
import { renderApp } from './renderApp'

export async function render(pageContext: PageContextBuiltIn) {
  return {
    documentHtml: await renderServer(renderApp, pageContext),
  }
}
