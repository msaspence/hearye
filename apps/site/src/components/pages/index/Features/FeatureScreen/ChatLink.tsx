import Box from '@mui/material/Box'
import { ReactNode } from 'react'

export function ChatLink({ children }: { children: ReactNode }) {
  return (
    <Box
      component="span"
      sx={{
        color: '#4374A8',
      }}
    >
      {children}
    </Box>
  )
}
