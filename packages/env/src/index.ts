import dotenv from 'dotenv'
import findConfig from 'find-config'
import { z } from 'zod'

dotenv.config({ path: findConfig('.env') || './.env' })

const booleanFromEnv = (value?: string | boolean) => {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') return value.toLowerCase() === 'true'
  return false
}

const rawEnv = {
  NODE_ENV: 'development',
  ...(typeof process === 'undefined'
    ? {}
    : (process.env as Record<string, string | undefined>)),
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  RENDER_GIT_COMMIT: z.string().optional(),
  LOGTAIL_ENABLED: z
    .union([z.string(), z.boolean()])
    .optional()
    .transform((value) => booleanFromEnv(value ?? false)),
  LOGTAIL_SOURCE_TOKEN: z.string().optional(),
  MIXPANEL_TOKEN: z.string().optional(),
  SLACK_CLIENT_ID: z.string().optional(),
  SLACK_CLIENT_SECRET: z.string().optional(),
  SLACK_SIGNING_SECRET: z.string().optional(),
  SLACK_STATE_SECRET: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  SENTRY_SAMPLE_RATE: z.coerce.number().min(0).max(1).default(1),
  REMINDER_CONCURRENCY: z.coerce.number().int().positive().max(50).default(10),
  LOOP_LENGTH: z.coerce.number().int().positive().default(1),
})

const parsed = envSchema.safeParse(rawEnv)

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error(
    'Invalid environment configuration',
    parsed.error.flatten().fieldErrors
  )
  throw new Error('Invalid environment configuration')
}

export type Env = z.infer<typeof envSchema>

export const env: Env = parsed.data
