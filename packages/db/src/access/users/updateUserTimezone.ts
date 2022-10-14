import { dayjs } from '@hearye/dayjs'
import { Reminder } from '../../models/Reminder'
import { User } from '../../models/User'

export async function updateUserTimezone(externalId: string, timezone: string) {
  const { id: userId, timezone: currentTimezone } = (await User.query().findOne(
    {
      source: 'slack',
      externalId,
    }
  )) as User

  const [user] = await User.query()
    .where('id', userId)
    .patch({ timezone })
    .returning('id')

  if (!user) return

  const newOffset = dayjs().tz(timezone).utcOffset()

  const currentOffset = dayjs().tz(currentTimezone).utcOffset()
  const offset = newOffset - currentOffset

  await Reminder.query()
    .where('userId', userId)
    .whereNull('remindedAt')
    .whereNull('acknowledgedAt')
    .increment('remindAt', offset * -60)
}
