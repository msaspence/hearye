import { createApp } from '../src/createApp'

describe('GET /error', () => {
  it('responds with 500"', async () => {
    const app = createApp()
    const response = await app.inject({
      method: 'GET',
      url: '/error',
    })
    expect(response.json()).toMatchObject({
      error: 'Internal Server Error',
      message: 'A message ',
      statusCode: 500,
    })
    expect(response.statusCode).toBe(500)
  })
})
