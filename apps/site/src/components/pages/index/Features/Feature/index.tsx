import { Box } from '@mui/material'
import { ReactNode } from 'react'

export * from './FeatureBody'
export * from './FeatureText'
export * from './FeatureTitle'

export function Feature({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', columnGap: '40px', marginBottom: '40px' }}>
      {children}
    </Box>
  )
}
