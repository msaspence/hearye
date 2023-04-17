import Box from '@mui/material/Box'
// import Typography from '@mui/material/Typography'
import { AddToSlackButton } from '../../AddToSlackButton'
import type { SxProps, Theme } from '@mui/material/styles'

export function Try({ sx: sxProp }: { sx?: SxProps<Theme> }) {
  return (
    <Box
      id="try"
      sx={{
        marginY: 7,
        marginX: 'auto',
        textAlign: 'center',
        ...sxProp,
      }}
    >
      {/* <Typography
        variant="h4"
        sx={{
          fontSize: { md: '100px', xs: '75px' },
          fontWeight: 'bold',
          marginBottom: '40px;',
        }}
      >
        Try For Free
      </Typography> */}
      <AddToSlackButton variant="large" />
    </Box>
  )
}
