// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StringIndexed = Record<string, any>
export type SlackEvent<EventType extends string> = Middleware<
  SlackEventMiddlewareArgs<EventType>,
  StringIndexed & StringIndexed
>
