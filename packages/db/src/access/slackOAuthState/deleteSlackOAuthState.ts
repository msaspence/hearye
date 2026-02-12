import { SlackOAuthState } from '../../models/SlackOAuthState'

export async function deleteSlackOAuthState(state: string) {
  return SlackOAuthState.query().deleteById(state)
}
