import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

import shortcutUrl from '../../../../../images/shortcut.png'

import {
  Feature,
  FeatureBody,
  FeatureNote,
  FeatureText,
  FeatureTitle,
  SubFeatureBody,
  SubFeatureTitle,
} from './Feature'
import {
  ChatMention,
  FeatureScreen,
  SkeletonHearYeMessage,
} from './FeatureScreen'
import { OriginalMessage } from './OriginalMessage'
import { ReminderMessage } from './ReminderMessage'

export function Features() {
  return (
    <Box id="features" sx={{ paddingTop: { xs: '0px', md: '50px' } }}>
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

      <Feature swap>
        <FeatureText>
          <FeatureTitle>2. Receive Reminders</FeatureTitle>
          <FeatureBody>
            Hear Ye! will remind anyone mentioned once a day sometime between
            10am and 11am until the message is acknowledged.
          </FeatureBody>
        </FeatureText>
        <FeatureScreen
          hearYeSelected
          messageCount={0}
          side="left"
          user="Michael"
        >
          <SkeletonHearYeMessage />
          <ReminderMessage />
        </FeatureScreen>
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

      <FeatureTitle>Advanced Features</FeatureTitle>

      <Feature>
        <FeatureText>
          <SubFeatureTitle>Notifying a Channel or Workspace</SubFeatureTitle>
          <SubFeatureBody>
            Use Slack's{' '}
            <ChatMention
              href="https://slack.com/intl/en-gb/help/articles/202009646-Notify-a-channel-or-workspace"
              isInArchivo
            >
              @here
            </ChatMention>
            ,{' '}
            <ChatMention
              href="https://slack.com/intl/en-gb/help/articles/202009646-Notify-a-channel-or-workspace"
              isInArchivo
            >
              @channel
            </ChatMention>
            , or{' '}
            <ChatMention
              href="https://slack.com/intl/en-gb/help/articles/202009646-Notify-a-channel-or-workspace"
              isInArchivo
            >
              @everyone
            </ChatMention>{' '}
            to require acknowledgement from everyone in the channel.
          </SubFeatureBody>
          <FeatureNote>
            <em>Note:</em> Broadcast mentions are currently limited to 500
            members of a channel.{' '}
            <ChatMention
              href="https://slack.com/intl/en-gb/help/articles/202009646-Notify-a-channel-or-workspace"
              isInArchivo
            >
              @here
            </ChatMention>{' '}
            will require acknowledgement from all members of the channel not
            just those online.
          </FeatureNote>
        </FeatureText>
      </Feature>

      <Feature>
        <FeatureText>
          <SubFeatureTitle>Notifying a User Group</SubFeatureTitle>
          <SubFeatureBody>
            Mention a{' '}
            <Link
              href="https://slack.com/intl/en-gb/help/articles/212906697-Create-a-user-group"
              target="_blank"
            >
              Slack User Group
            </Link>{' '}
            to require acknowledgement from everyone in that group.
          </SubFeatureBody>
          <FeatureNote>
            <em>Note:</em> Groups are currently limited to 500 users.{' '}
          </FeatureNote>
        </FeatureText>
      </Feature>

      <Feature>
        <FeatureText>
          <SubFeatureTitle>Message Shortcut</SubFeatureTitle>
          <Box
            component="img"
            src={shortcutUrl}
            sx={{
              float: 'left',
              width: '312px',
              boxShadow: '1px 1px 4px rgba(0,0,0,0.3)',

              borderRadius: '5px',
              marginRight: '25px',
              marginTop: '23px',
            }}
          />
          <SubFeatureBody>
            If you send out a message and forget to mention{' '}
            <ChatMention isInArchivo>@Hear Ye</ChatMention> you can use the
            "Require Acknowledgement" message short cut to require
            acknowledgements from mentioned users and/or additional users.
          </SubFeatureBody>
        </FeatureText>
      </Feature>
    </Box>
  )
}
