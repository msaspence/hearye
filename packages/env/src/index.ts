import dotenv from 'dotenv'
import findConfig from 'find-config'

dotenv.config({ path: findConfig('.env') || './.env' })

export const env: Record<Uppercase<string>, string | undefined> = {
  NODE_ENV: 'development',
  ...(process.env as Record<string, string>),
}
