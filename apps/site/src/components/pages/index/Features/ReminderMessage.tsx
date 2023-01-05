import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'

import {
  FeatureScreenZoom,
  ChatMention,
  ChatLink,
  ChatButton,
} from './FeatureScreen'

export function ReminderMessage() {
  return (
    <FeatureScreenZoom
      author="Hear Ye!"
      time="10:02 AM"
      sx={{
        top: '45px',
        left: { md: '-25px', xs: '-10px' },
        right: { md: '-0px', xs: '-10px' },
      }}
    >
      Hey <ChatMention>@Michael</ChatMention>
      <br />
      You have an unacknowledged message in{' '}
      <ChatMention>#paperwork</ChatMention>.
      <br />
      Please take the time read and acknowledge{' '}
      <Tooltip
        arrow
        placement="bottom"
        title="Easily jump to the original message"
      >
        <ChatLink>this message</ChatLink>
      </Tooltip>{' '}
      with a 👍
      <Box>
        <Tooltip
          arrow
          placement="right"
          title="Easily jump to the original message"
        >
          <ChatButton>Go To Message</ChatButton>
        </Tooltip>
      </Box>
    </FeatureScreenZoom>
  )
}
