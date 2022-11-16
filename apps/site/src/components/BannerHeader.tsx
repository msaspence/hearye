import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { AddToSlackButton } from './AddToSlackButton'
import logoUrl from '../../images/logo.png'

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
          width: '400px',
        }}
        onClick={() => alert('hello')}
      >
        <Typography sx={{ marginBottom: '20px' }} variant="h2">
          Don't Miss Another!
          <br />
          Critical Message Again
        </Typography>
        <AddToSlackButton />
      </Box>
    </Box>
  )
}
