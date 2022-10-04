import { Model } from 'objection'

import '../init'

export class Announcement extends Model {
  id!: string
  channelExternalId!: string
  timestamp!: string
  accountId!: string
  externalId!: string
  source!: string

  static get tableName() {
    return 'announcements'
  }
}
