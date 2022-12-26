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
      sx={{ top: '45px', left: '-25px', right: '-0px' }}
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
        <ChatLink>the message</ChatLink>
      </Tooltip>{' '}
      with a 👍
      <Tooltip
        arrow
        placement="right"
        title="Easily jump to the original message"
      >
        <ChatButton>Go To Message</ChatButton>
      </Tooltip>
    </FeatureScreenZoom>
  )
}
