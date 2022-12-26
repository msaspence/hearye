import Box from '@mui/material/Box'

import { Feature, FeatureBody, FeatureText, FeatureTitle } from './Feature'
import {
  ChatMention,
  FeatureScreen,
  SkeletonHearYeMessage,
} from './FeatureScreen'
import { OriginalMessage } from './OriginalMessage'
import { ReminderMessage } from './ReminderMessage'

export function Features() {
  return (
    <Box id="features" sx={{ paddingTop: '50px' }}>
      <Feature>
        <FeatureText>
          <FeatureTitle>1. Mark Critical Messages</FeatureTitle>
          <FeatureBody>
            To indicate a message is critical and requires acknowledgement that
            it has been read, simply mention <ChatMention>@Hear Ye</ChatMention>{' '}
            in the message body.
          </FeatureBody>
        </FeatureText>
        <FeatureScreen messageCount={7} user="Pam">
          <OriginalMessage />
        </FeatureScreen>
      </Feature>

      <Feature>
        <FeatureScreen
          hearYeSelected
          messageCount={0}
          side="left"
          user="Michael"
        >
          <SkeletonHearYeMessage />
          <ReminderMessage />
        </FeatureScreen>
        <FeatureText>
          <FeatureTitle>2. Receive Reminders</FeatureTitle>
          <FeatureBody>
            Hear Ye! will remind anyone mentioned once a day sometime between
            10am and 11am until the message is acknowledged.
          </FeatureBody>
        </FeatureText>
      </Feature>

      <Feature>
        <FeatureText>
          <FeatureTitle>3. React to Acknowledge</FeatureTitle>
          <FeatureBody>
            Messages can be acknowledged by reacting with a 👍. Once
            acknowledged no further reminders will be sent.
          </FeatureBody>
        </FeatureText>
        <FeatureScreen messageCount={7} user="Michael">
          <OriginalMessage acknowledged sx={{ top: '80px' }} />
        </FeatureScreen>
      </Feature>
    </Box>
  )
}
