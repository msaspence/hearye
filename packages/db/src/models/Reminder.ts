import { Model } from 'objection'

import '../init'

export class Reminder extends Model {
  id!: string
  accountId!: string
  iteration!: number
  userId!: string | undefined
  remindAt?: Date
  remindedAt?: Date

  static get tableName() {
    return 'reminders'
  }
}
