import { BaseModel } from './BaseModel'

import '../init'

export class Announcement extends BaseModel {
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
