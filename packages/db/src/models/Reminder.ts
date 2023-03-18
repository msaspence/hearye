import { User } from './User'
import { BaseModel } from './BaseModel'
import '../init'
import { Message } from './Message'

export class Reminder extends BaseModel {
  id!: string
  accountId!: string
  iteration!: number
  userId!: string
  messageId!: string
  retries!: number
  remindAt!: Date
  remindedAt?: Date | null
  acknowledgedAt?: Date | null
  lockedUntil?: Date | null

  user!: User
  message!: Message

  static relationMappings = {
    message: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Message,
      join: {
        from: 'reminders.messageId',
        to: 'messages.id',
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
