import Box from '@mui/material/Box'

import { posts } from '../../../pages/blog'
import { BlogPost } from './BlogPost'

export function BlogPosts({ tag }: { tag?: string }) {
  return (
    <Box sx={{ marginTop: 6 }}>
      {posts
        .filter(({ tags }) => !tag || tags?.includes(tag))
        .map(({ description, path, publishedAt, tags, title, subTitle }) => {
          return (
            <BlogPost
              description={description}
              key={path}
              path={path}
              publishedAt={publishedAt}
              tags={tags}
              subTitle={subTitle}
              title={title}
            />
          )
        })}
    </Box>
  )
}
