import type { ClientContext } from './types'

export function getTitle(
  pageContext: ClientContext
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