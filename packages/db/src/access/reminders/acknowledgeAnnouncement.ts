import { Reminder } from '../../models/Reminder'

export async function acknowledgeAnnouncement(
  userId: string,
  channelExternalId: string,
  timestamp: string
) {
  await Reminder.query()
    .update({ acknowledgedAt: new Date() })
    .whereIn('id', function () {
      this.select('reminders.id')
        .from('reminders')
        .joinRelated('announcement')
        .where('userId', userId)
        .whereNull('acknowledgedAt')
        .where('announcement.channelExternalId', channelExternalId)
        .where('announcement.timestamp', timestamp)
        .orderBy('iteration', 'desc')
        .limit(1)
    })
}
