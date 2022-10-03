import { Announcement } from '../../models/Announcement'
import { UniqueViolationError } from 'objection'

export async function findOrCreateAnnouncement(params: {
  accountId: string
  source: string
  externalId: string
  channelExternalId: string
  timestamp: string
}): Promise<Announcement> {
  const { accountId, source, externalId } = params

  const existingAnnouncement = await Announcement.query()
    .findOne({
      accountId,
      source,
      externalId,
    })
    .select('id')

  if (existingAnnouncement) return existingAnnouncement
  try {
    return await Announcement.query().insert(params)
  } catch (error) {
    if (error instanceof UniqueViolationError) {
      return findOrCreateAnnouncement(params)
    }
    throw error
  }
}
