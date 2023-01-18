import { updateUserTimezone } from '@hearye/db'

import { SlackEvent } from '../events'

export async function handleUserChange({
  payload: {
    user: { id, tz: timezone },
  },
}: {
  payload: SlackEvent<'user_change'>
}) {
  return updateUserTimezone('slack', id, timezone)
}
