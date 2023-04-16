import ReactDOM from 'react-dom/client'

import { getTitle } from './getTitle'
import { mixpanel } from '../contexts/MixPanel'
import { ClientContext } from './types'

let root: ReactDOM.Root

export function hydrateClient(
  renderApp: (pageContext: ClientContext) => JSX.Element,
  pageContext: ClientContext
) {
  mixpanel.track('Page View', {
    title: document.title,
    path: pageContext.urlOriginal,
  })
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
