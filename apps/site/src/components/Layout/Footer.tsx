import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

export function Footer() {
  return (
    <Box
      sx={{
        marginTop: '150px',
        display: 'flex',
        '.MuiLink-root': { marginX: '5px' },
      }}
    >
      <Typography sx={{ fontSize: 22 }} variant="subtitle1">
        © Hear Ye! 2022
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Box>
        <Link href="#features" variant="subtitle1">
          Features
        </Link>
        <Link href="#pricing" variant="subtitle1">
          Pricing
        </Link>
        <Link href="/privacy.html" variant="subtitle1">
          Privacy Policy
        </Link>
        <Link href="mailto:hello@hearyebot.com" variant="subtitle1">
          Contact Us
        </Link>
      </Box>
    </Box>
  )
}
