import { UserChangeEvent } from '@slack/bolt'
import { User } from '@hearye/db'

export async function handleUserChange({
  payload: {
    user: { id, tz: timezone },
  },
}: {
  payload: UserChangeEvent
}) {
  return User.query()
    .where('source', 'slack')
    .where('externalId', id)
    .patch({ timezone })
}
