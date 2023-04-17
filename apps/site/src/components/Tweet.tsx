import Box from '@mui/material/Box'
import { TwitterTweetEmbed } from 'react-twitter-embed'

export function Tweet({ tweetId }: { tweetId: string }) {
  return (
    <Box sx={{ marginX: 'auto', maxWidth: '550px', marginY: 5 }}>
      <TwitterTweetEmbed tweetId={tweetId} />
    </Box>
  )
}
