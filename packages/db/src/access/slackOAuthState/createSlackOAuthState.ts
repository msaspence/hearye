import { SlackOAuthState } from '../../models/SlackOAuthState'

export async function createSlackOAuthState(params: {
  state: string
  installOptions: Record<string, unknown>
  expiresAt: Date
}) {
  const { state, installOptions, expiresAt } = params
  return SlackOAuthState.query().insert({ state, installOptions, expiresAt })
}
