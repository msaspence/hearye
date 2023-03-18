import { setupServer, SetupServer } from 'msw/node'
import { MockedRequest } from 'msw'
import { createWaitForRequest } from './createWaitForRequest'

export function createMockServer(...args: Parameters<typeof setupServer>) {
  const result: {
    server?: SetupServer
    waitForRequest: ReturnType<typeof createWaitForRequest>
    requests: MockedRequest[]
  } = {
    waitForRequest: () => Promise.reject(new Error('Mock server not ready')),
    requests: [],
  }
  beforeAll(() => {
    const server = setupServer(...args)
    result.server = server
    result.waitForRequest = createWaitForRequest(server)
    server.events.on('request:start', (req) => {
      result.requests.push(req)
    })
    server.listen({ onUnhandledRequest: 'error' })
  })
  afterAll(() => {
    result.server?.close()
  })
  afterEach(() => result.server?.resetHandlers())
  return result
}
