import Box from '@mui/material/Box'
import { Feature, FeatureBody, FeatureText, FeatureTitle } from './Feature'
import {
  FeatureScreen,
  SkeletonHearYeMessage,
  FeatureScreenZoom,
  ChatMention,
  ChatLink,
  ChatButton,
} from './FeatureScreen'
import { OriginalMessage } from './OriginalMessage'
export function Features() {
  return (
    <Box id="features" sx={{ paddingTop: '50px' }}>
      <Feature>
        <FeatureText>
          <FeatureTitle>1. Mark Critical Messages</FeatureTitle>
          <FeatureBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            imperdiet mi in eleifend rhoncus. Nulla facilisi. Ut molestie, diam
            vel posuere luctus, orci ligula sagittis diam, eget vehicula lacus
            sapien in lorem. Praesent feugiat eleifend ex vitae mattis.
            Phasellus ornare commodo ante et feugiat. Nunc imperdiet iaculis
            est, at maximus lacus varius eget. Maecenas lobortis magna quis diam
            tempus dapibus. Nullam porta leo lorem, sit amet tempor tortor
            luctus a. Cras nisl libero, gravida at sem sit amet, efficitur
            suscipit sapien. Morbi ac mollis urna. Suspendisse laoreet dictum
            commodo.
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
          <FeatureScreenZoom
            author="Hear Ye!"
            time="12:15 PM"
            sx={{ top: '45px', left: '-25px', right: '-0px' }}
          >
            Hey <ChatMention>@Michael</ChatMention>
            <br />
            You have an unacknowledged message in{' '}
            <ChatMention>#paperwork</ChatMention>.
            <br />
            Please take the time read and acknowledge{' '}
            <ChatLink>the message</ChatLink> with a 👍
            <ChatButton>Go To Message</ChatButton>
          </FeatureScreenZoom>
        </FeatureScreen>
        <FeatureText>
          <FeatureTitle>2. Receive Reminders</FeatureTitle>
          <FeatureBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            imperdiet mi in eleifend rhoncus. Nulla facilisi. Ut molestie, diam
            vel posuere luctus, orci ligula sagittis diam, eget vehicula lacus
            sapien in lorem. Praesent feugiat eleifend ex vitae mattis.
            Phasellus ornare commodo ante et feugiat. Nunc imperdiet iaculis
            est, at maximus lacus varius eget. Maecenas lobortis magna quis diam
            tempus dapibus. Nullam porta leo lorem, sit amet tempor tortor
            luctus a. Cras nisl libero, gravida at sem sit amet, efficitur
            suscipit sapien. Morbi ac mollis urna. Suspendisse laoreet dictum
            commodo.
          </FeatureBody>
        </FeatureText>
      </Feature>

      <Feature>
        <FeatureText>
          <FeatureTitle>3. React to Acknowledge</FeatureTitle>
          <FeatureBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            imperdiet mi in eleifend rhoncus. Nulla facilisi. Ut molestie, diam
            vel posuere luctus, orci ligula sagittis diam, eget vehicula lacus
            sapien in lorem. Praesent feugiat eleifend ex vitae mattis.
            Phasellus ornare commodo ante et feugiat. Nunc imperdiet iaculis
            est, at maximus lacus varius eget. Maecenas lobortis magna quis diam
            tempus dapibus. Nullam porta leo lorem, sit amet tempor tortor
            luctus a. Cras nisl libero, gravida at sem sit amet, efficitur
            suscipit sapien. Morbi ac mollis urna. Suspendisse laoreet dictum
            commodo.
          </FeatureBody>
        </FeatureText>
        <FeatureScreen messageCount={7} user="Michael">
          <OriginalMessage acknowledged sx={{ top: '80px' }} />
        </FeatureScreen>
      </Feature>
    </Box>
  )
}
