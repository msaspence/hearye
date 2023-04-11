import { BannerHeader } from '../components/BannerHeader'
import { Layout } from '../components/Layout/Layout'
import { BlogPosts } from '../components/pages/blog/BlogPosts'

export const title = 'Hear Ye! Blog'

export function Page() {
  return (
    <Layout>
      <BannerHeader variant="blog" />
      <BlogPosts />
    </Layout>
  )
}
