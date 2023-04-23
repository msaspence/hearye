import Box from '@mui/material/Box'
import { ReactNode } from 'react'
import { Footer } from './Footer'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        maxWidth: { md: '958px', xs: '475px' },
        margin: '0 auto 0px',
        padding: { xs: '20px 20px', md: '50px 100px' },
        minWidth: '355px',
      }}
    >
      {children}
      <Footer />
    </Box>
  )
}
