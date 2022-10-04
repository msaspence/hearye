import { Model } from 'objection'

import '../init'

export class User extends Model {
  id!: string
  externalId!: string
  source!: string
  accountId!: string

  static get tableName() {
    return 'users'
  }
}
