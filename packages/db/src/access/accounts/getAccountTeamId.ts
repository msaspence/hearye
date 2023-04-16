import { Account } from "../../models/Account";

export async function getAccountTeamId(account: Account): Promise<string | null> {
  if (!account.installation) return null
  const installation = JSON.parse(account.installation)
  return installation.team?.id || installation.enterprise?.id
}