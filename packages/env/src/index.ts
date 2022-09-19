import dotenv from 'dotenv'
import findConfig from 'find-config'

dotenv.config({ path: findConfig('.env') || './.env' })

module.exports = process.env as Record<string, string>
