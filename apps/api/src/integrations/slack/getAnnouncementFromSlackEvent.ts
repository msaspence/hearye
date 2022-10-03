import { findOrCreateAnnouncement } from '@hearye/db'

export async function getAnnouncementFromSlackEvent(accountId: string, event) {
  const announcementDetails = getAnnouncementDetailsFromSlackEvent(
    accountId,
    event
  )
  return findOrCreateAnnouncement(announcementDetails)
}

function getAnnouncementDetailsFromSlackEvent(
  accountId: string,
  event: {
    payload: {
      channel: string
      client_msg_id: string
      team: string
      ts: string
    }
  }
) {
  return {
    accountId,
    externalId: event.payload.client_msg_id,
    channelExternalId: event.payload.channel,
    source: 'slack',
    timestamp: event.payload.ts,
  }
}
