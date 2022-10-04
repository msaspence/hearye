import { Account } from '../../models/Account'

export async function findInstallationByAccountId(accountId: string) {
  const account = await Account.query()
    .findById(accountId)
    .select('installation')
  const { installation } = account || {}
  if (!installation) return null
  return JSON.parse(installation)
}
