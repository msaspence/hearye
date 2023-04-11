import { VoidFunctionComponent } from 'react'
import type { Dayjs } from '@hearye/dayjs'

const postsForPaths = import.meta.glob<{
  description: string
  tags: string[]
  title: string
  publishedAt: Dayjs
  subTitle: string
  Page: VoidFunctionComponent
}>('./post/*page.tsx', { eager: true })

export const posts = Object.entries(postsForPaths).map(([path, post]) => ({
  ...post,
  path,
})).sort((
  { publishedAt: aPublishedAt }, 
  { publishedAt: bPublishedAt }
) => { 
  return bPublishedAt.diff(aPublishedAt) 
})
