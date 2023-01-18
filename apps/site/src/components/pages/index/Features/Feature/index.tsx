import { Box } from '@mui/material'
import { ReactNode } from 'react'

export * from './FeatureBody'
export * from './FeatureNote'
export * from './FeatureText'
export * from './FeatureTitle'
export * from './SubFeatureBody'
export * from './SubFeatureTitle'

export function Feature({
  children,
  swap = false,
}: {
  children: ReactNode
  swap?: boolean
}) {
  return (
    <Box
      sx={{
        display: { md: 'flex' },
        flexDirection: { md: swap ? 'row-reverse' : 'row' },
        columnGap: '40px',
        marginBottom: { xs: '50px', md: '40px' },
      }}
    >
      {children}
    </Box>
  )
}
