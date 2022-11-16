import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { renderToString } from 'react-dom/server'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'

import { App } from '../App'
import { getFavIconsHtml } from '../favicons/getFavIcons'

export async function render({ Page }: PageContextBuiltIn) {
  const html = renderToString(
    <App>
      <Page />
    </App>
  )
  const { html: favIconHtml } = await getFavIconsHtml()

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <title>Hear Ye! - Slack message acknowledgements and reminders</title>
        ${dangerouslySkipEscape(favIconHtml.join('\n'))}
      </head>
      <body>
        <div id="page-root">${dangerouslySkipEscape(html)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here
    },
  }
}
