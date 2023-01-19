import { findOrCreateAccount } from '@hearye/db'

export async function getAccountFromSlackMessage(message: { team: string }) {
  const accountDetails = getAccountDetailsFromSlackMessage(message)
  return findOrCreateAccount(accountDetails)
}

function getAccountDetailsFromSlackMessage(message: { team: string }) {
  const externalId = message.team
  if (!externalId) throw new Error('No team_id found in Slack event')
  return {
    externalId,
    source: 'slack',
  }
}
