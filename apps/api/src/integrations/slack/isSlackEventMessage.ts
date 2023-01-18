// import { SlackEventMiddlewareArgs } from '@slack/bolt'

export async function isSlackEventMessage(event: {
  payload: { type: string }
}) {
  return event.payload.type === 'app_mention'
}
