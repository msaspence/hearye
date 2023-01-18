import { findOrCreateAccount } from '@hearye/db'

export async function getAccountFromSlackEvent(event: {
  body: { team_id: string }
}) {
  const accountDetails = getAccountDetailsFromSlackEvent(event)
  return findOrCreateAccount(accountDetails)
}

function getAccountDetailsFromSlackEvent(event: { body: { team_id: string } }) {
  return {
    externalId: event.body.team_id,
    source: 'slack',
  }
}
