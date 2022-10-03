import { getAccountDetailsFromSlackEvent } from './getAccountDetailsFromSlackEvent'
import { findOrCreateAccount } from '@hearye/db'

export async function getAccountFromSlackEvent(event) {
  const accountDetails = await getAccountDetailsFromSlackEvent(event)
  return findOrCreateAccount(accountDetails)
}
