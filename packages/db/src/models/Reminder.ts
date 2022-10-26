import { User } from './User'
import { BaseModel } from './BaseModel'
import '../init'
import { Announcement } from './Announcement'

export class Reminder extends BaseModel {
  id!: string
  accountId!: string
  iteration!: number
  userId!: string
  retries!: number
  remindAt!: Date
  remindedAt?: Date | null
  acknowledgedAt?: Date | null
  lockedUntil?: Date | null

  user!: User
  announcement!: Announcement

  static relationMappings = {
    announcement: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Announcement,
      join: {
        from: 'reminders.announcementId',
        to: 'announcements.id',
      },
    },
    user: {
      relation: BaseModel.BelongsToOneRelation,
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
