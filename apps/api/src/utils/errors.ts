type ErrorWithStack = {
  stack: string
}

export function isErrorWithStack(error: unknown): error is ErrorWithStack {
  return (
    typeof error === 'object' &&
    error !== null &&
    'stack' in error &&
    typeof (error as Record<string, unknown>).stack === 'object' &&
    !!(error as ErrorWithStack).stack
  )
}
