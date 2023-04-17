import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import type { SxProps, Theme } from '@mui/material/styles'

export function List({
  children,
  sx,
}: {
  children: ReactNode
  sx?: SxProps<Theme>
}) {
  return (
    <Box
      sx={{
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export function ListItem({
  children,
  href,
  sx,
}: {
  children: ReactNode
  href?: string
  sx?: SxProps<Theme>
}) {
  if (href) {
    return (
      <Link
        href={href}
        target={href.match(/^https?:\/\//) ? '_blank' : ''}
        variant="subtitle1"
        sx={{ minHeight: '24px', lineHeight: '24px', ...sx }}
      >
        {children}
      </Link>
    )
  }
  return <Box>{children}</Box>
}
