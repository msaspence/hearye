import { renderToString } from 'react-dom/server'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr'
import { getFavIconsHtml } from '../favicons/getFavIcons'
import { getTitle } from './getTitle'

export async function renderServer(
  renderApp: (
    pageContext: PageContextBuiltIn & {
      pageProps: Record<string, unknown>
      exports: Record<string, unknown>
    }
  ) => JSX.Element,
  pageContext: PageContextBuiltIn & {
    pageProps: Record<string, unknown>
    exports: Record<string, unknown>
  }
) {
  const { html: favIconHtml } = await getFavIconsHtml()
  const appHtml = renderToString(renderApp(pageContext))
  return escapeInject`<!DOCTYPE html>
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
        <title>${getTitle(pageContext)}</title>
        <meta id="document-description" name="description" content="${
          typeof pageContext.exports.description === 'string'
            ? pageContext.exports.description
            : 'Get acknowledgements and reminders for your crucial Slack messages and announcements.'
        }" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:900|Lato:700|Lato:400">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Just+Another+Hand:400">
        ${dangerouslySkipEscape(favIconHtml.join('\n'))}
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
      </head>
      <body>
        <div id="page-root">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`
}
