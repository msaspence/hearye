import { BannerHeader } from '../components/BannerHeader'
import { Layout } from '../components/Layout'
import { Features } from '../components/pages/index/Features'
import { Pricing } from '../components/pages/index/Pricing'
import { Try } from '../components/pages/index/Try'

export function Page() {
  return (
    <Layout>
      <BannerHeader />
      <Features />
      <Pricing />
      <Try />
    </Layout>
  )
}
