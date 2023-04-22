import cookie from 'cookie'
import { IncomingMessage, ServerResponse } from 'http'
import { v4 as uuid } from 'uuid'

export function getUserId(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  const { userId = uuid() } = req.headers.cookie
    ? cookie.parse(req.headers.cookie)
    : {}
  const [domain] = req.headers.host?.match(/(^localhost)|([^.]+\.[^.]+)$/) || []

  if (userId) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('userId', userId, {
        expires: new Date(2033, 1, 1),
        httpOnly: false,
        path: '/',
        domain,
      })
    )
  }
  return userId
}
