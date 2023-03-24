import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'

import { ReactNode } from 'react'
import { Avatar } from './Avatar'
export { Reaction } from './Reaction'

export type User = 'Pam' | 'Hear Ye!'

export function FeatureScreenZoom({
  author,
  children,
  sx = {},
  reactions,
  time,
}: {
  author: User
  children: ReactNode
  sx?: SxProps<Theme>
  reactions?: ReactNode
  time: string
}) {
  return (
    <Box
      sx={{
        background: 'white',
        boxShadow: '2px 2px 8px rgba(0,0,0,0.5)',
        borderRadius: '2px',
        padding: '7px 10px',
        position: 'absolute',
        top: '120px',
        zIndex: 1000,
        left: { xs: '-10px', md: '-10px' },
        right: { xs: '-10px', md: '-20px' },
        ...sx,
      }}
    >
      <Box
        sx={{
          color: 'rgb(30,30,30)',
          display: 'flex',
          fontFamily: 'Lato',
          fontWeight: 400,
          fontSize: '14px',
        }}
      >
        <Avatar user={author} />
        <Box>
          <Box sx={{ lineHeight: '1em' }}>
            <Box component="span" sx={{ fontSize: '15px', fontWeight: 900 }}>
              {author}
            </Box>
            {'\u00A0\u00A0'}
            <Box
              component="span"
              sx={{ fontSize: '12px', color: 'rgb(100,100,100)' }}
            >
              {time}
            </Box>
          </Box>
          {children}
          {reactions && (
            <Box sx={{ marginTop: '5px', display: 'flex' }}>{reactions}</Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
