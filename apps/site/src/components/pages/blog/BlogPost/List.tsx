import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

export function List({
  children,
  ordered = false,
}: {
  children: React.ReactNode
  ordered?: boolean
}) {
  return (
    <Box component={ordered ? 'ol' : 'ul'} marginBottom={5} marginTop={-1}>
      {children}
    </Box>
  )
}

export function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      component="li"
      color="#222"
      fontSize={20}
      variant="body1"
      marginY={1}
    >
      {children}
    </Typography>
  )
}
