import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'
import { CSSProperties } from '@mui/styled-engine'

export function SubFeatureBody({
  children,
  sx = {},
}: {
  children: ReactNode
  sx?: CSSProperties
}) {
  return (
    <Typography sx={{ marginTop: '20px', ...sx }} variant="body2">
      {children}
    </Typography>
  )
}
