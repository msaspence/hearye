import { Model } from 'objection'

import { User } from './User'
import '../init'
import { Announcement } from './Announcement'

export class Reminder extends Model {
  id!: string
  accountId!: string
  iteration!: number
  userId!: string | undefined
  remindAt?: Date
  remindedAt?: Date

  user!: User
  announcement!: Announcement

  static relationMappings = {
    announcement: {
      relation: Model.BelongsToOneRelation,
      modelClass: Announcement,
      join: {
        from: 'reminders.announcementId',
        to: 'announcements.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'reminders.userId',
        to: 'users.id',
      },
    },
  }

  static get tableName() {
    return 'reminders'
  }
}
