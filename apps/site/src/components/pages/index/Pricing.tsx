import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function Pricing() {
  return (
    <Box
      id="pricing"
      sx={{
        margin: '25px auto 0',
        padding: '50px 0',
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
            fontSize: '200px',
            lineHeight: '150px',
            marginRight: '20px',
            marginTop: '10px',
          }}
          variant="h3"
        >
          50¢
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: '75px',
            lineHeight: '75px',
          }}
          variant="h4"
        >
          per person
        </Typography>
        <Typography
          sx={{
            fontSize: '75px',
            lineHeight: '75px',
          }}
          variant="h4"
        >
          per month
        </Typography>
      </Box>
    </Box>
  )
}
