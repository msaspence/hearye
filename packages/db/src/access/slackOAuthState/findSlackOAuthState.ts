import { SlackOAuthState } from '../../models/SlackOAuthState'

export async function findSlackOAuthState(state: string) {
  return SlackOAuthState.query().findById(state)
}
