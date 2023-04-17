import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { List, ListItem } from './List'
import {
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Facebook as FacebookIcon,
  Email as EmailIcon,
} from '@mui/icons-material'
import { Icon } from '@iconify/react'

export function Footer() {
  return (
    <Box
      sx={{
        marginTop: '150px',
        display: 'flex',
        '.MuiLink-root': { display: 'block', marginY: 1 },
      }}
    >
      <Typography sx={{ fontSize: 22 }} variant="subtitle1">
        © Hear Ye! 2022
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <List sx={{ marginRight: 4 }}>
        <ListItem
          href="https://slack.com/apps/A046NME2JAX-hear-ye"
          sx={{ marginTop: '0px' }}
        >
          <Icon
            icon="mdi:slack"
            style={{
              height: '24px',
              width: '24px',
              position: 'relative',
              top: '3px',
              marginTop: '-4px',
            }}
          />{' '}
          Slack App Directory
        </ListItem>

        <ListItem href="mailto:hello@hearyebot.com">
          <EmailIcon /> Contact Us
        </ListItem>
        <ListItem href="https://twitter.com/HearYeBot">
          <TwitterIcon /> Twitter
        </ListItem>
        <ListItem href="https://www.linkedin.com/company/hear-ye-bot">
          <LinkedInIcon /> LinkedIn
        </ListItem>
        <ListItem href="https://www.facebook.com/HearYeBot">
          <FacebookIcon /> Facebook
        </ListItem>
      </List>
      <List>
        <ListItem href="/#features">Features</ListItem>
        <ListItem href="/#pricing">Pricing</ListItem>

        <ListItem href="/blog">Blog</ListItem>
        <ListItem href="/privacy.html">Privacy Policy</ListItem>
      </List>
    </Box>
  )
}
