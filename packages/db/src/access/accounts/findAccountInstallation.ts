import { Account } from '../../models/Account'

export async function findAccountInstallation(
  source: string,
  externalId: string
) {
  const account = await Account.query()
    .findOne({
      externalId,
      source,
    })
    .select('installation')
  if (!account || !account.installation) return null
  return JSON.parse(account.installation)
}
