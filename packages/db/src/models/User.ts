import { Model } from 'objection'

import '../init'

export class User extends Model {
  id: string | undefined
  externalId: string | undefined
  source: string | undefined
  accountId: string | undefined

  static get tableName() {
    return 'users'
  }
}
