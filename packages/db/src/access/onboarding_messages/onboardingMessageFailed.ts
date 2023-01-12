import { OnboardingMessage } from '../../models/OnboardingMessage'

export function onboardingMessageFailed(
  accountId: string,
  userId: string,
  messageKey: string
) {
  return OnboardingMessage.query()
    .where({
      accountId,
      userId,
      messageKey,
    })
    .delete()
}
