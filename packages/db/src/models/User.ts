import { BaseModel } from './BaseModel'

import '../init'

export class User extends BaseModel {
  id!: string
  externalId!: string
  source!: string
  accountId!: string
  timezone?: string

  static get tableName() {
    return 'users'
  }
}
