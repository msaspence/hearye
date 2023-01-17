import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'

export function SubFeatureTitle({ children }: { children: ReactNode }) {
  return (
    <Typography variant="h4" sx={{ marginTop: '10px' }}>
      {children}
    </Typography>
  )
}
