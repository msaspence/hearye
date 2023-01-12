import { BaseModel } from './BaseModel'

import '../init'

export class OnboardingMessage extends BaseModel {
  id!: string
  accountId!: string
  userId!: string
  messageKey!: string

  static get tableName() {
    return 'onboarding_messages'
  }
}
