import { WebClient, WebAPIPlatformError } from '@slack/web-api'

function isPlatformError(error: unknown): error is WebAPIPlatformError {
  return (error as WebAPIPlatformError).code === 'slack_webapi_platform_error'
}
export async function acknowledgeMessageReciept(
  client: WebClient,
  channel: string,
  ts: string
) {
  try {
    await client.reactions.add({
      channel: channel,
      name: 'mega',
      timestamp: ts,
    })
    return true
  } catch (error) {
    // If the message has already been acknowledged, we can ignore the error
    if (isPlatformError(error) && error.data.error === 'already_reacted') {
      return true
    }
    throw error
  }
}
