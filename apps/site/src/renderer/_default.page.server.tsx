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
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XS0B008NL4"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XS0B008NL4');
        </script>
        <title>Hear Ye! - Slack message acknowledgements and reminders</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:900|Lato:700|Lato:400">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Just+Another+Hand:400">
        ${dangerouslySkipEscape(favIconHtml.join('\n'))}
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
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
