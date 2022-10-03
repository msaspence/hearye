export async function getAccountDetailsFromSlackEvent(event: {
  payload: { team: string }
}) {
  return {
    externalId: event.payload.team,
    source: 'slack',
  }
}
