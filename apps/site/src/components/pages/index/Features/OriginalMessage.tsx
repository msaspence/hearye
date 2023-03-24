import type { CSSProperties } from '@mui/styled-engine'
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
              placement="top"
              title="Hear Ye! will confirm it has registered a message requires acknowledgement by reacting with a 🔔"
            >
              <Reaction>🔔</Reaction>
            </Tooltip>
          }
          {acknowledged && (
            <Tooltip
              arrow
              placement="top"
              title="To acknowledge a message, and dismiss future reminders just react with a 👍"
            >
              <Reaction self>👍</Reaction>
            </Tooltip>
          )}
        </>
      }
    >
      <Tooltip
        arrow
        placement="top"
        title="Any one mentioned in the message will be periodically reminded to acknowledge until they do"
      >
        <ChatMention>@Michael</ChatMention>
      </Tooltip>{' '}
      Did you sign the time cards yet? We really need them signed by 7pm to make
      the last pick up for overnight delivery.{' '}
      <Tooltip
        arrow
        placement="top"
        title="To indicate a message requires acknowledgement, just mention @Hear Ye"
      >
        <ChatMention>@Hear Ye</ChatMention>
      </Tooltip>
    </FeatureScreenZoom>
  )
}
