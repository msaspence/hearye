import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { createWaitForRequest } from './createWaitForRequest'

export function createMockServer(...args: Parameters<typeof setupServer>) {
  const server = setupServer(...args)
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  afterAll(() => {
    server.close()
  })
  afterEach(() => server.resetHandlers())
  return { server, waitForRequest: createWaitForRequest(server) }
}
