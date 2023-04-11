import Typography from '@mui/material/Typography'

export function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      color="#222"
      fontSize={22}
      variant="body1"
      paragraph
      marginBottom={5}
    >
      {children}
    </Typography>
  )
}
