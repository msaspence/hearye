import Box from '@mui/material/Box'
import { ReactNode, forwardRef } from 'react'

export const ChatLink = forwardRef((props: { children: ReactNode }, ref) => {
  return (
    <Box
      component="span"
      sx={{
        color: '#4374A8',
        cursor: 'pointer',
        '&:hover': {
          textDecoration: 'underline',
        },
      }}
      ref={ref}
      {...props}
    />
  )
})
