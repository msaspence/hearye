import Box from '@mui/material/Box'
import { ReactNode } from 'react'

export function ChatButton({ children }: { children: ReactNode }) {
  return (
    <Box
      component="button"
      sx={{
        background: 'white',
        border: '1px solid #BBB',
        borderRadius: '3px',
        color: '#1D1D1D',
        padding: '3px 8px',
        marginTop: '10px',
        fontWeight: 700,
        fontSize: '13px',
      }}
    >
      {children}
    </Box>
  )
}
