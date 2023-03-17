import { createApp } from '../src/createApp'

describe('GET /', () => {
  it('responds with 200 hello: "world"', async () => {
    const app = createApp()
    const response = await app.inject({
      method: 'GET',
      url: '/',
    })
    expect(response.json()).toMatchObject({
      hello: 'world',
      dbConnection: expect.any(Number),
    })
    expect(response.statusCode).toBe(200)
  })
})
