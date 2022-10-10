import { BaseModel } from './BaseModel'

import '../init'

export class Account extends BaseModel {
  id: string | undefined
  domain: string | undefined
  externalId: string | undefined
  source: string | undefined
  installation: string | null | undefined

  static get tableName() {
    return 'accounts'
  }
}
