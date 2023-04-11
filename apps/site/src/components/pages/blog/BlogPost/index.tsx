import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { Dayjs } from '@hearye/dayjs'

import { PublishedAt } from './PublishedAt'

export function BlogPost({
  description,
  path,
  publishedAt,
  tags,
  subTitle,
  title,
  children,
}: {
  description?: string
  path?: string
  publishedAt: Dayjs
  tags?: string[]
  title: string
  subTitle: string
  children?: React.ReactNode
}) {
  return (
    <Box sx={{ marginTop: 10 }}>
      <Stack direction="row" alignItems="flex-end">
        <Box flexGrow={1}>
          {path ? (
            <Link
              href={path.replace(/^\.\//, '/blog/').replace(/\.page\.tsx$/, '')}
            >
              <Typography variant="h2">{title}</Typography>
            </Link>
          ) : (
            <Typography variant="h2">{title}</Typography>
          )}
        </Box>
        {tags && tags.length && (
          <Stack direction="row" spacing={1}>
            {tags.map((tag) => (
              <Link href={`/blog/tag/${tag}`} key={tag}>
                <Chip
                  label={tag}
                  onClick={() => {
                    // noop
                  }}
                />
              </Link>
            ))}
          </Stack>
        )}
      </Stack>
      <Stack direction="row" alignItems="flex-end">
        <Typography
          variant="h3"
          sx={{
            marginTop: 0.5,
            marginBottom: 0,
            color: '#777',
            fontSize: '45px',
            flexGrow: 1,
          }}
        >
          {subTitle}
        </Typography>
        <PublishedAt at={publishedAt} />
      </Stack>

      {children || (
        <Typography variant="body1" marginTop={3}>
          {description}
        </Typography>
      )}
    </Box>
  )
}
