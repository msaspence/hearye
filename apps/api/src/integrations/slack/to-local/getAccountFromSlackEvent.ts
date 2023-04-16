import { findOrCreateAccount } from '@hearye/db'

export async function getAccountFromSlackEvent(event: {
  body: { team_id: string }
}) {
  const accountDetails = getAccountDetailsFromSlackEvent(event)
  return findOrCreateAccount(accountDetails)
}

function getAccountDetailsFromSlackEvent(event: { 
  body: { 
    team_id?: string, 
    team?: { id: string } | null,
    enterprise?: { id: string } | null,
  }
}) {
  const externalId = event.body.team_id || event.body.team?.id || event.body.enterprise?.id
  if (!externalId) throw new Error('No team_id found in Slack event')
  return {
    externalId,
    source: 'slack',
  }
}
