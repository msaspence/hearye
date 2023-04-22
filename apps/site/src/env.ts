// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const env: Record<string, string | undefined> = import.meta.env

export function getEnvVar(key: string): string {
  const value = env[key]
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}
