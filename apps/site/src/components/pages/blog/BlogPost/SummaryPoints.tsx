import Box from '@mui/material/Box'

export function SummaryPoints({ children }: { children: React.ReactNode }) {
  return (
    <Box component="ul" marginY={5} marginX={3}>
      {children}
    </Box>
  )
}

export function SummaryPoint({ children }: { children: React.ReactNode }) {
  return (
    <Box component="li" marginBottom={0.1}>
      {children}
    </Box>
  )
}
