import Box from '@mui/material/Box'
import { Feature, FeatureBody, FeatureText, FeatureTitle } from './Feature'
import { FeatureScreen, SkeletonHearYeMessage } from './FeatureScreen'

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
        <FeatureScreen messageCount={5} user="Angela" />
      </Feature>

      <Feature>
        <FeatureScreen appsSelected side="left" user="Michael">
          <SkeletonHearYeMessage />
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
        <FeatureScreen messageCount={5} user="Michael" />
      </Feature>
    </Box>
  )
}
