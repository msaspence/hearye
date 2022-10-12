import { UserChangeEvent } from '@slack/bolt'
import { updateUserTimezone } from '@hearye/db'

export async function handleUserChange({
  payload: {
    user: { id, tz: timezone },
  },
}: {
  payload: UserChangeEvent
}) {
  return updateUserTimezone(id, timezone)
}
