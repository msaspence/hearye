import { Model } from 'objection'

import { User } from './User'
import '../init'

export class Reminder extends Model {
  id!: string
  accountId!: string
  iteration!: number
  userId!: string | undefined
  remindAt?: Date
  remindedAt?: Date

  user!: User

  static relationMappings = {
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
