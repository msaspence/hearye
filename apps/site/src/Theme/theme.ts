import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  components: {
    // Name of the component

    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '18px',
          lineHeight: '1em',
          letterSpacing: '-0.015em',
        },
        h1: {
          fontSize: '120px',
        },
        h2: {
          fontSize: '55px',
          lineHeight: 1,
          fontWeight: 700,
        },
        h3: {
          fontSize: '60px',
          fontWeight: 'normal',
          marginTop: '30px',
          marginBottom: '10px',
        },
        h4: {
          fontWeight: 'normal',
        },
        h5: {
          fontWeight: 'normal',
        },
        h6: {
          fontWeight: 'normal',
        },
        body1: {
          fontFamily: 'Archivo Narrow',
          lineHeight: 1.3,
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: 'rgb(211, 112, 13)',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: 22,

          '&:hover': {
            color: 'rgb(234, 125, 15)',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: 'Neumatic Gothic Round',
  },
})
