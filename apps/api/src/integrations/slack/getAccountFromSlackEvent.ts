import { findOrCreateAccount } from '@hearye/db'

export async function getAccountFromSlackEvent(event) {
  const accountDetails = getAccountDetailsFromSlackEvent(event)
  return findOrCreateAccount(accountDetails)
}

function getAccountDetailsFromSlackEvent(event: { payload: { team: string } }) {
  return {
    externalId: event.payload.team,
    source: 'slack',
  }
}
