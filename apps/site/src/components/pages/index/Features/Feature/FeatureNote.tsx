import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'
import type { CSSProperties } from '@mui/styled-engine'

export function FeatureNote({
  children,
  sx = {},
}: {
  children: ReactNode
  sx?: CSSProperties
}) {
  return (
    <Typography
      sx={{ marginTop: '10px', color: '#777', fontSize: '18px', ...sx }}
      variant="body2"
    >
      {children}
    </Typography>
  )
}
