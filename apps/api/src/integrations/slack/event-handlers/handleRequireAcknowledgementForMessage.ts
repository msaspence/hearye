import { WebClient } from '@slack/web-api'
import some from 'lodash/some'

import {
  requireAcknowledgementsForMessage,
  Message,
} from '../requireAcknowledgementsForMessage'

export async function handleRequireAcknowledgementForMessage({
  ack,
  client,
  payload,
}: {
  ack: () => Promise<void>
  client: WebClient
  payload: {
    team_id: string
    channel: { id: string }
    private_metadata: string
    state: PayloadState
    trigger_id: string
  }
}) {
  await ack()
  const options = getOptionsFromPayload(payload)
  const message = await getOriginalMessage(client, payload)

  await requireAcknowledgementsForMessage(client, message, options)
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

async function getOriginalMessage(
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
