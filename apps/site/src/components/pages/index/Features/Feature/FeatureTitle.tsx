import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'

export function FeatureTitle({ children }: { children: ReactNode }) {
  return (
    <Typography variant="h3" sx={{ marginTop: '10px' }}>
      {children}
    </Typography>
  )
}
