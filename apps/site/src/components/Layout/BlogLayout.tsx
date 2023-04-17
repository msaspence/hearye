import { BannerHeader } from '../../components/BannerHeader'
import { Layout } from './Layout'

export function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <BannerHeader variant="blog" />
      {children}
    </Layout>
  )
}
