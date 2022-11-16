import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AddToSlackButton } from '../../AddToSlackButton'

export function Try() {
  return (
    <Box
      id="try"
      sx={{
        margin: '0 auto',
        padding: '50px 0',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: '100px',
          fontWeight: 'bold',
          marginBottom: '40px;',
        }}
      >
        Try For Free
      </Typography>
      <AddToSlackButton variant="large" />
    </Box>
  )
}
