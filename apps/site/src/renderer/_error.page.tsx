import { Typography } from '@mui/material'
import { BannerHeader } from '../components/BannerHeader'
import { Layout } from '../components/Layout/Layout'

export function Page({ is404 }: { is404: boolean }) {
  return (
    <Layout>
      <BannerHeader />
      <Typography variant="h1" marginTop={8}>
        {is404 ? '404: Page not found' : '500'}
      </Typography>
    </Layout>
  )
}
