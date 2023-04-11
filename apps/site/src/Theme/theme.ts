import { createTheme } from '@mui/material/styles'

const { breakpoints } = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1200,
      xl: 1536,
    },
  },
})
export const theme = createTheme({
  breakpoints,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'rgb(211, 112, 13)',
          '&:hover': {
            background: 'rgb(234, 125, 15)',
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          color: '#666',
          border: '1px solid #ccc',
          fontSize: '24px',
          '&:hover': {
            background: 'rgb(211, 112, 13)',
          }
        }
      }
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: 'Archivo Narrow',
          fontSize: '16px',
          background: '#333',
          boxShadow: '0px 0px 5px rgba(0,0,0,0.5)',
          padding: '8px 14px',
        },
        arrow: {
          color: '#333',
        },
      },
    },

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
          fontSize: '50px',
          lineHeight: 1,
          fontWeight: 700,
          [breakpoints.down('md')]: { fontSize: '40px' },
        },
        h3: {
          fontSize: '60px',
          fontWeight: 'normal',
          marginTop: '30px',
          marginBottom: '10px',
          [breakpoints.down('md')]: {
            fontSize: '50px',
            marginTop: '30px',
            marginBottom: '0px',
          },
        },
        h4: {
          fontSize: '40px',
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
          fontSize: '24px',
          lineHeight: 1.3,

          [breakpoints.down('md')]: {
            fontSize: '22px',
            marginTop: '10px',
            marginBottom: '20px',
          },
        },
        body2: {
          fontFamily: 'Archivo Narrow',
          fontSize: '20px',
          lineHeight: 1.3,
          '.MuiLink-root': {
            fontSize: '20px',
            fontWeight: 'normal',
          },
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
