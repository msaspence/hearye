import { BaseModel } from './BaseModel'

export class SlackOAuthState extends BaseModel {
  state!: string
  installOptions!: Record<string, unknown>
  expiresAt!: Date

  static get tableName() {
    return 'slack_oauth_states'
  }

  static get idColumn() {
    return 'state'
  }

  static get jsonAttributes() {
    return ['installOptions']
  }
}
