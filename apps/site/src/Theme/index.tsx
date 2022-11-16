import Box from '@mui/material/Box'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ReactNode } from 'react'

import '../../styles/reset.css'
import '../../fonts/fonts.css'
import '@fontsource/archivo-narrow'

import { theme } from './theme'
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Box
        sx={{
          fontFamily: 'Archivo Narrow',
          fontSize: '22px',
        }}
      >
        {children}
      </Box>
    </MuiThemeProvider>
  )
}
