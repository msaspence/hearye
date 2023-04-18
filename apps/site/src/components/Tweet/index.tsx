import Box from '@mui/material/Box'
import { EmbeddedTweet } from './EmbeddedTweet'

export function Tweet({ tweetId }: { tweetId: string }) {
  return (
    <Box sx={{ marginX: 'auto', maxWidth: '550px', marginY: 5 }}>
      <EmbeddedTweet tweetId={tweetId} />
    </Box>
  )
}
