import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function Quote({
  author,
  children,
}: {
  author: string
  children: ReactNode
}) {
  return (
    <Typography
      component="blockquote"
      borderLeft="4px solid #ddd"
      color="#666"
      fontSize={20}
      fontWeight={400}
      variant="body1"
      fontStyle="italic"
      padding={2}
      paragraph
      marginBottom={3}
      marginTop={8}
    >
      {children}
      <Box marginTop={1} textAlign="right">
        {author}
      </Box>
    </Typography>
  )
}
