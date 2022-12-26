import Box from '@mui/material/Box'
import { ReactNode } from 'react'

export function ChatMention({ children }: { children: ReactNode }) {
  return (
    <Box
      component="span"
      sx={{
        borderRadius: '3px',
        color: '#4374A8',
        background: '#EBF5F9',
        padding: '2px 3px',
      }}
    >
      {children}
    </Box>
  )
}
