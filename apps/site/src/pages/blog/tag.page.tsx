import { BannerHeader } from '../../components/BannerHeader'
import { Layout } from '../../components/Layout/Layout'
import { BlogPosts } from '../../components/pages/blog/BlogPosts'

export function title({
  routeParams: { tag },
}: {
  routeParams: { tag?: string }
}) {
  return `${tag ? `Posts tagged "${tag}" - ` : ''}Hear Ye! Blog`
}
export function Page({
  routeParams: { tag },
}: {
  routeParams: { tag?: string }
}) {
  return (
    <Layout>
      <BannerHeader variant="blog" />
      <BlogPosts tag={tag} />
    </Layout>
  )
}
