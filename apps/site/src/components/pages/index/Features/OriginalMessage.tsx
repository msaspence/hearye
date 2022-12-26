import { CSSProperties } from '@mui/styled-engine'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'

import { FeatureScreenZoom, ChatMention, Reaction } from './FeatureScreen'

export function OriginalMessage({
  acknowledged = false,
  sx = {},
}: {
  acknowledged?: boolean
  sx?: CSSProperties
}) {
  return (
    <FeatureScreenZoom
      author="Pam"
      time="10:34 AM"
      sx={sx}
      reactions={
        <>
          {
            <Tooltip
              arrow
              placement="right"
              title="Hear Ye! will confirm it has registered a message that requires acknowledgement by reacting with a 🔔"
            >
              <Box>
                <Reaction>🔔</Reaction>
              </Box>
            </Tooltip>
          }
          {acknowledged && <Reaction self>👍</Reaction>}
        </>
      }
    >
      <ChatMention>@Michael</ChatMention> Did you sign the time cards yet? We
      really need them signed by 7pm to make the last pick up for overnight
      delivery. <ChatMention>@Hear Ye</ChatMention>
    </FeatureScreenZoom>
  )
}
