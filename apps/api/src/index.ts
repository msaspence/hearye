import { env } from '@hearye/env'

import { createApp } from './createApp'

const { PORT } = env

const app = createApp()
app.listen({ host: '0.0.0.0', port: parseInt(PORT || '3000') })
