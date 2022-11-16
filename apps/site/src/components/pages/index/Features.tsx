import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function Features() {
  return (
    <Box id="features" sx={{ paddingTop: '50px' }}>
      <div className="feature">
        <div className="text">
          <Typography variant="h3">Mark Critical Messages</Typography>
          <Typography variant="body1">
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
          </Typography>
        </div>
        <div className="slack-screen">
          <div className="nav">
            <div className="skeleton white" />
            <div className="separator" />
            <div className="skeleton grey" />
            <div className="skeleton grey" />
            <div className="skeleton grey" />
            <div className="skeleton grey" />
            <div className="skeleton grey" />
          </div>
        </div>
      </div>

      <div className="feature">
        <Typography variant="h3">Recieve Reminders</Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          imperdiet mi in eleifend rhoncus. Nulla facilisi. Ut molestie, diam
          vel posuere luctus, orci ligula sagittis diam, eget vehicula lacus
          sapien in lorem. Praesent feugiat eleifend ex vitae mattis. Phasellus
          ornare commodo ante et feugiat. Nunc imperdiet iaculis est, at maximus
          lacus varius eget. Maecenas lobortis magna quis diam tempus dapibus.
          Nullam porta leo lorem, sit amet tempor tortor luctus a. Cras nisl
          libero, gravida at sem sit amet, efficitur suscipit sapien. Morbi ac
          mollis urna. Suspendisse laoreet dictum commodo.
        </Typography>
      </div>

      <div className="feature">
        <Typography variant="h3">React to Acknowledge</Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          imperdiet mi in eleifend rhoncus. Nulla facilisi. Ut molestie, diam
          vel posuere luctus, orci ligula sagittis diam, eget vehicula lacus
          sapien in lorem. Praesent feugiat eleifend ex vitae mattis. Phasellus
          ornare commodo ante et feugiat. Nunc imperdiet iaculis est, at maximus
          lacus varius eget. Maecenas lobortis magna quis diam tempus dapibus.
          Nullam porta leo lorem, sit amet tempor tortor luctus a. Cras nisl
          libero, gravida at sem sit amet, efficitur suscipit sapien. Morbi ac
          mollis urna. Suspendisse laoreet dictum commodo.
        </Typography>
      </div>
    </Box>
  )
}
