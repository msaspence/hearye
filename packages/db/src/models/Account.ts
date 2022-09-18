import { Model } from 'objection'

import '../init'

export class Account extends Model {
  id: string | undefined
  displayName: string | undefined
  domain: string | undefined
  externalId: string | undefined
  source: string | undefined

  static get tableName() {
    return 'accounts'
  }
}
