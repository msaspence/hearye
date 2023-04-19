import Box from '@mui/material/Box'
import { EmbeddedTweet } from './EmbeddedTweet'
import { ReactNode } from 'react'

export function Tweet({
  tweetId,
  placeholder,
}: {
  tweetId: string
  placeholder?: ReactNode
}) {
  return (
    <Box sx={{ marginX: 'auto', maxWidth: '550px', marginY: 5 }}>
      <EmbeddedTweet tweetId={tweetId} placeholder={placeholder} />
    </Box>
  )
}
