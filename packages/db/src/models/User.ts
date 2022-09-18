import { Model } from 'objection'

import '../init'

export class User extends Model {
  id: string | undefined
  displayName: string | undefined
  realName: string | undefined
  externalId: string | undefined
  source: string | undefined
  userName: string | undefined

  static get tableName() {
    return 'users'
  }
}
