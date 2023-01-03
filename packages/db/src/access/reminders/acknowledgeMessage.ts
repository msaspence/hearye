import { Reminder } from '../../models/Reminder'

export async function acknowledgeMessage(
  userId: string,
  channelExternalId: string,
  timestamp: string
) {
  await Reminder.query()
    .patch({ acknowledgedAt: new Date() })
    .whereIn('id', function () {
      this.select('reminders.id')
        .from('reminders')
        .joinRelated('message')
        .where('userId', userId)
        .whereNull('acknowledgedAt')
        .where('message.channelExternalId', channelExternalId)
        .where('message.timestamp', timestamp)
        .orderBy('iteration', 'desc')
        .limit(1)
    })
}
