import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import { BannerHeader } from '../components/BannerHeader'
import { Layout } from '../components/Layout'

export function Page() {
  return (
    <Layout>
      <BannerHeader />
      <Box sx={{ marginTop: '50px' }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginY: '50px' }}
        >
          <Button
            href="mailto:hello@hearyebot.com"
            variant="contained"
            sx={{ fontSize: '50px' }}
          >
            Get Support
          </Button>
        </Box>
      </Box>
    </Layout>
  )
}
