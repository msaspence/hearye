import { ReactNode } from 'react'
import type { CSSProperties } from '@mui/styled-engine'
import Box from '@mui/material/Box'

type On = 'light' | 'dark'
export function SkeletonBox({
  sx = {},
  on = 'light',
  children,
}: {
  children?: ReactNode
  sx?: CSSProperties
  on?: On
}) {
  return (
    <Box
      sx={{
        background: BACKGROUNDS[on],
        borderRadius: '2px',
        opacity: '0.4',
        height: '10px',
        marginY: '5px',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

const BACKGROUNDS: Record<On, string> = {
  dark: '#ffffff',
  light: '#000000',
}
