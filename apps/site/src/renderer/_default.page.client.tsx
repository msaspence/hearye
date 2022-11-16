import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'

import { App } from '../App'

export const clientRouting = true
export const hydrationCanBeAborted = true

import ReactDOM from 'react-dom/client'

let root: ReactDOM.Root
export async function render(pageContext: PageContextBuiltInClient) {
  const { Page } = pageContext

  const page = (
    <App>
      <Page />
    </App>
  )

  const container = document.getElementById('page-root')
  // SPA
  if (container) {
    if (container.innerHTML === '' || !pageContext.isHydration) {
      if (!root) {
        root = ReactDOM.createRoot(container)
      }
      root.render(page)
      // SSR
    } else {
      root = ReactDOM.hydrateRoot(container, page)
    }
  }
}
