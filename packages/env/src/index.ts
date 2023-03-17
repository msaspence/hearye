import dotenv from 'dotenv'
import findConfig from 'find-config'

dotenv.config({ path: findConfig('.env') || './.env' })

export const env: Record<string, string> = {
  NODE_ENV: 'development',
  ...(typeof process === 'undefined'
    ? {}
    : (process.env as Record<string, string>)),
}
