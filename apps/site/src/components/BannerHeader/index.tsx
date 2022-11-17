import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { AddToSlackButton } from '../AddToSlackButton'
import logoUrl from '../../../images/logo.png'
import { TagLineTicker } from './TagLineTicker'

export function BannerHeader() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ display: 'none' }} variant="h1">
          Hear Ye!
        </Typography>
        <Box
          component="img"
          id="logo"
          src={logoUrl}
          sx={{
            marginRight: '50px',
            width: '200px',
          }}
          alt="Hear Ye!"
        />
      </Box>
      <Box
        sx={{
          textAlign: 'right',
          marginTop: '20px',
          width: '550px',
        }}
      >
        <Typography variant="h2">Don't Miss Another</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            marginBottom: '20px',
          }}
        >
          <TagLineTicker />{' '}
          <Typography variant="h2" sx={{ marginLeft: '10px' }}>
            Again
          </Typography>
        </Box>
        <AddToSlackButton />
      </Box>
    </Box>
  )
}
