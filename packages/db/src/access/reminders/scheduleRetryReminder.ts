import { dayjs } from '@hearye/dayjs'
import { Reminder } from '../../models/Reminder'

export function scheduleRetryReminder(reminder: Reminder) {
  const retries = reminder.retries + 1
  return Reminder.query()
    .findById(reminder.id)
    .update({
      ...reminder,
      retries,
      lockedUntil: calculateLockedUntil(retries).toDate(),
    })
}

const INITIAL_RETRY_DELAY = 60
const MAX_RETRY_DELAY = 60 * 60 * 24
function calculateLockedUntil(retries: number) {
  const seconds = modifier(retries) * INITIAL_RETRY_DELAY
  const maxSeconds = Math.min(seconds, MAX_RETRY_DELAY)
  return dayjs().add(maxSeconds, 'seconds')
}

function modifier(retries: number) {
  return 2 ** retries / 2
}
