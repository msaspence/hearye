import { WebClient } from '@slack/web-api'
import some from 'lodash/some'

import { trackAnalyticsEventFromSlackEvent } from '../actions/trackAnalyticsEventFromSlackEvent'

import {
  requireAcknowledgementsForMessage,
  Message,
} from '../requireAcknowledgementsForMessage'

export async function handleRequireAcknowledgementForMessage(event: {
  ack: () => Promise<void>
  client: WebClient
  body: { team_id: string }
  payload: {
    team_id: string
    private_metadata: string
    state: PayloadState
    trigger_id: string
    user: string
  }
}) {
  const { ack, client, payload } = event
  const options = getOptionsFromPayload(payload)
  trackAnalyticsEventFromSlackEvent('Require Acknowledgement', event, {
    from_shortcut: true,
    include_mentioned: options.includeMentioned,
    other_users: options.otherUsers.length > 0,
  })
  const message = await getOriginalMessage(client, payload)
  await requireAcknowledgementsForMessage(client, message, options)
  await ack()
}

type PayloadState = {
  values: Record<
    string,
    | { options: { selected_options: [{ value: string }] } }
    | { 'other-users': { selected_users: string[] } }
  >
}
function getOptionsFromPayload(payload: { state: PayloadState }) {
  const values = Object.values(payload.state.values).reduce(
    (current, result) => ({ ...result, ...current }),
    {} as {
      options?: { selected_options: [{ value: string }] }
      'other-users'?: { selected_users: string[] }
    }
  )
  const includeMentioned = some(
    values.options?.selected_options,
    ({ value }) => value === 'include-mentioned'
  )
  const otherUsers = values['other-users']?.selected_users || []
  return { includeMentioned, otherUsers }
}

export async function getOriginalMessage(
  client: WebClient,
  payload: { private_metadata: string; team_id: string }
) {
  const {
    message: { channel, ts },
  } = JSON.parse(payload.private_metadata as string) as {
    message: { channel: string; ts: string }
  }
  const result = await client.conversations.history({
    channel,
    latest: ts,
    limit: 1,
    inclusive: true,
  })
  const [message] = result.messages || []

  return {
    ...message,
    channel,
    team: payload.team_id,
  } as Message
}
