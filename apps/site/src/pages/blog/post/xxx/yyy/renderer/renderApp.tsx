import type { PageContextBuiltIn } from 'vite-plugin-ssr'
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'
import { Dayjs } from '@hearye/dayjs'

import { BlogLayout } from '../../../../../../components/Layout/BlogLayout'
import { App } from '../../../../../../App'
import { BlogPost } from '../../../../../../components/pages/blog/BlogPost'

export function renderApp({
  Page,
  exports,
  urlPathname,
}: PageContextBuiltIn | PageContextBuiltInClient) {
  const { title, publishedAt, subTitle, tags } = exports as {
    title: string
    publishedAt: Dayjs
    tags: string[]
    subTitle: string
  }
  return (
    <App>
      <BlogLayout>
        <BlogPost
          title={title}
          subTitle={subTitle}
          path={urlPathname}
          publishedAt={publishedAt}
          tags={tags}
        >
          <Page />
        </BlogPost>
      </BlogLayout>
    </App>
  )
}
