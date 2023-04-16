import { Account } from "../../models/Account";

export async function getAccountTeamName(account: Account): Promise<string | null> {
  if (!account.installation) return null
  const installation = JSON.parse(account.installation)
  return installation.team?.name || installation.enterprise?.name
}