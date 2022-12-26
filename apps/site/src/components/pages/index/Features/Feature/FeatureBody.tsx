import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'

export function FeatureBody({ children }: { children: ReactNode }) {
  return (
    <Typography sx={{ marginTop: '20px' }} variant="body1">
      {children}
    </Typography>
  )
}
