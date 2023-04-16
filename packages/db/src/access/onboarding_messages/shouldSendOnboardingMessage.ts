import { OnboardingMessage } from '../../models/OnboardingMessage'
import { UniqueViolationError } from 'objection'

export async function shouldSendOnboardingMessage(
  accountId: string,
  userId: string,
  messageKey: string
): Promise<boolean> {
  try {
    await OnboardingMessage.query().insert({ accountId, userId, messageKey })
    return true
  } catch (error) {
    if (error instanceof UniqueViolationError) {
      return false
    }
    throw error
  }
}
