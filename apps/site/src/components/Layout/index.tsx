import Box from '@mui/material/Box'
import { ReactNode } from 'react'

import { Footer } from './Footer'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        maxWidth: '1024px',
        margin: '0 auto 0px',
        padding: '50px 100px',
      }}
    >
      {children}
      <Footer />
    </Box>
  )
}
