import { randomBytes } from 'crypto'
import { InvalidStateError, InstallURLOptions, StateStore } from '@slack/oauth'
import {
  createSlackOAuthState,
  deleteSlackOAuthState,
  findSlackOAuthState,
} from '@hearye/db'

const STATE_TTL_SECONDS = 600
const STATE_BYTE_LENGTH = 32

export class DatabaseStateStore implements StateStore {
  constructor(private readonly ttlSeconds: number = STATE_TTL_SECONDS) {}

  async generateStateParam(installOptions: InstallURLOptions, now: Date) {
    const state = randomBytes(STATE_BYTE_LENGTH).toString('hex')
    await createSlackOAuthState({
      state,
      installOptions: installOptions as unknown as Record<string, unknown>,
      expiresAt: new Date(now.getTime() + this.ttlSeconds * 1000),
    })
    return state
  }

  async verifyStateParam(now: Date, state: string) {
    const record = await findSlackOAuthState(state)
    if (!record) {
      throw new InvalidStateError('Unknown OAuth state')
    }
    try {
      if (record.expiresAt.getTime() < now.getTime()) {
        throw new InvalidStateError('The state value is already expired')
      }
      return record.installOptions as InstallURLOptions
    } finally {
      await deleteSlackOAuthState(state)
    }
  }
}
