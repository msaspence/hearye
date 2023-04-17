import Typography from '@mui/material/Typography'

export function Heading({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      color="#222"
      fontSize={40}
      fontWeight={600}
      variant="h4"
      paragraph
      marginBottom={3}
      marginTop={8}
    >
      {children}
    </Typography>
  )
}
