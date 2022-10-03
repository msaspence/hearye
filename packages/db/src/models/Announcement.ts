import { Model } from 'objection'

import '../init'

export class Announcement extends Model {
  id: string | undefined
  channelExternalId: string | undefined
  timestamp: string | undefined
  accountId: string | undefined
  externalId: string | undefined
  source: string | undefined

  static get tableName() {
    return 'announcements'
  }
}
