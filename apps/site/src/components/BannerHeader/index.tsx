import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

import { AddToSlackButton } from '../AddToSlackButton'
import logoUrl from '../../../images/logo.png'
import { TagLineTicker } from './TagLineTicker'

export function BannerHeader() {
  return (
    <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
      <Box
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          flexGrow: 1,
        }}
      >
        <Link
          href="/"
          sx={{
            position: 'absolute',
          }}
        >
          <Typography sx={{ display: 'none' }} variant="h1">
            Hear Ye!
          </Typography>
          <Box
            component="img"
            id="logo"
            src={logoUrl}
            sx={{
              marginRight: { xs: '0', md: '50px' },
              width: { xs: '100px', md: '180px' },
            }}
            alt="Hear Ye!"
          />
          <Typography
            sx={{
              color: '#777',
              fontFamily: 'Just Another Hand',
              position: 'absolute',
              bottom: '-35px',
              right: '55px',
              transform: 'rotate(-10deg)',
            }}
            variant="h3"
          >
            Beta
          </Typography>
        </Link>
        <Box sx={{ display: { xs: 'block', md: 'none' }, flexGrow: 1 }} />
        <AddToSlackButton
          sx={{ display: { xs: 'inline-flex', md: 'none' }, marginTop: '8px' }}
        />
      </Box>
      <Box
        sx={{
          textAlign: { xs: 'left', md: 'right' },
          marginTop: { xs: '30px', md: '15px' },
        }}
      >
        <Typography variant="h2">Don't Miss Another</Typography>
        <Box
          sx={{
            display: { xs: 'block', md: 'flex' },
            justifyContent: { xs: 'left', md: 'right' },
            marginBottom: '20px',
          }}
        >
          <TagLineTicker />{' '}
          <Typography variant="h2" sx={{ marginLeft: { xs: '0', md: '8px' } }}>
            Again
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Typography
            component="span"
            sx={{
              color: '#777',
              marginRight: '12px',
              fontFamily: 'Just Another Hand',
              fontSize: '2em',
            }}
            variant="h4"
          >
            Free for the Beta
          </Typography>
          <Typography
            component="span"
            sx={{
              color: '#777',
              fontFamily: 'Archivo Narrow',
              marginRight: '12px',
              fontSize: '1.5em',
              lineHeight: '1em',
            }}
          >
            →
          </Typography>
          <AddToSlackButton
            sx={{ display: { xs: 'none', md: 'inline-flex' } }}
          />
        </Box>
      </Box>
    </Box>
  )
}
