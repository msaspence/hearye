import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { AddToSlackButton } from '../AddToSlackButton'
import logoUrl from '../../../images/logo.png'
import { TagLineTicker } from './TagLineTicker'

export function BannerHeader() {
  return (
    <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
      <Box sx={{ alignItems: 'flex-start', display: 'flex', flexGrow: 1 }}>
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
        <AddToSlackButton sx={{ display: { xs: 'none', md: 'inline-flex' } }} />
      </Box>
    </Box>
  )
}
