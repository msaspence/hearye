import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'
import { getTitle } from './getTitle'

import ReactDOM from 'react-dom/client'

let root: ReactDOM.Root

export function hydrateClient(
  renderApp: (
    pageContext: PageContextBuiltInClient & {
      pageProps: Record<string, unknown>
    }
  ) => JSX.Element,
  pageContext: PageContextBuiltInClient & { pageProps: Record<string, unknown> }
) {
  const page = renderApp(pageContext)
  const container = document.getElementById('page-root')
  document.title = getTitle(pageContext)
  document
    .getElementById('document-description')
    ?.setAttribute(
      'content',
      typeof pageContext.exports.description === 'string'
        ? pageContext.exports.description
        : 'Get acknowledgements and reminders for your crucial Slack messages and announcements.'
    )

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
