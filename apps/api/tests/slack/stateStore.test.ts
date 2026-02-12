import { describe, expect, it } from 'vitest'
import { InstallURLOptions } from '@slack/oauth'

import { findSlackOAuthState } from '@hearye/db'

import { DatabaseStateStore } from '../../src/integrations/slack/stateStore'

const installOptions: InstallURLOptions = {
  scopes: ['commands'],
}

describe('DatabaseStateStore', () => {
  it('persists generated states in the database', async () => {
    const store = new DatabaseStateStore()
    const now = new Date('2023-01-01T00:00:00Z')
    const state = await store.generateStateParam(installOptions, now)
    expect(state).toMatch(/^[a-f0-9]{64}$/)
    const persisted = await findSlackOAuthState(state)
    expect(persisted?.state).toBe(state)
    expect(persisted?.installOptions).toMatchObject(installOptions)
  })

  it('verifies and then deletes state rows', async () => {
    const store = new DatabaseStateStore()
    const now = new Date('2023-01-02T00:00:00Z')
    const state = await store.generateStateParam(installOptions, now)
    const verified = await store.verifyStateParam(
      new Date(now.getTime() + 1000),
      state
    )
    expect(verified).toMatchObject(installOptions)
    expect(await findSlackOAuthState(state)).toBeUndefined()
  })

  it('rejects expired states', async () => {
    const ttlSeconds = 1
    const store = new DatabaseStateStore(ttlSeconds)
    const now = new Date('2023-01-03T00:00:00Z')
    const state = await store.generateStateParam(installOptions, now)
    await expect(
      store.verifyStateParam(new Date(now.getTime() + 3000), state)
    ).rejects.toThrow('The state value is already expired')
  })
})
