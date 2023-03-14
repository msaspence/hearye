import { WebAPIPlatformError } from '@slack/web-api'

export function isSlackError(error: unknown): error is WebAPIPlatformError {
  return (error as WebAPIPlatformError).code === 'slack_webapi_platform_error'
}
