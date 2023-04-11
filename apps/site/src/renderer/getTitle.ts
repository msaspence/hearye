import type { PageContextBuiltIn } from 'vite-plugin-ssr'

export function getTitle(
  pageContext: PageContextBuiltIn & {
    pageProps: Record<string, unknown>
    exports: Record<string, unknown>
  }
) {
  switch (typeof pageContext.exports.title) {
    case 'string':
      return `${pageContext.exports.title}${typeof pageContext.exports.subTitle === 'string' ? ` - ${pageContext.exports.subTitle}` : ''}`
    case 'function':
      return pageContext.exports.title(pageContext)
    default:
      return 'Hear Ye! - Slack Message Acknowledgements and Reminders'
  }
}