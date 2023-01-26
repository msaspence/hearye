import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function Pricing() {
  return (
    <Box
      id="pricing"
      sx={{
        margin: '25px auto 0',
        padding: '50px 0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          fontFamily: 'Neumatic Gothic Round',
          fontWeight: 'bold',
          justifyContent: 'center',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: { md: '200px', xs: '150px' },
              lineHeight: { md: '150px', xs: '65px' },
              marginRight: '20px',
              marginTop: '10px',
              textDecoration: 'line-through',
            }}
            variant="h3"
          >
            50¢
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: { md: '75px', xs: '50px' },
              lineHeight: { md: '75px', xs: '50px' },
            }}
            variant="h4"
          >
            per person
          </Typography>
          <Typography
            sx={{
              fontSize: { md: '75px', xs: '50px' },
              lineHeight: { md: '75px', xs: '50px' },
            }}
            variant="h4"
          >
            per month
          </Typography>
        </Box>
      </Box>
      <Typography
        sx={{
          color: '#777',
          marginRight: '12px',
          fontFamily: 'Just Another Hand',
          fontSize: '5em',
          textAlign: 'center',
          marginTop: '20px',
        }}
        variant="h4"
      >
        Free for the Beta
      </Typography>
    </Box>
  )
}
