import { BannerHeader } from '../../components/BannerHeader'
import { Pricing } from '../../components/pages/index/Pricing'
import { Try } from '../../components/pages/index/Try'
import { Layout } from './Layout'

export function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <BannerHeader variant="blog" />
      {children}
      <Pricing />
      <Try />
    </Layout>
  )
}
