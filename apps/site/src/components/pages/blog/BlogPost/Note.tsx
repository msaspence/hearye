import Typography from '@mui/material/Typography'

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      color="#666"
      fontSize={22}
      fontStyle="italic"
      variant="body1"
      paragraph
      marginBottom={5}
      marginTop={-3}
    >
      {children}
    </Typography>
  )
}
