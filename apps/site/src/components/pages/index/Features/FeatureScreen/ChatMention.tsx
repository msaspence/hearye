import Box from '@mui/material/Box'
import { ReactNode, forwardRef } from 'react'

export const ChatMention = forwardRef((props: { children: ReactNode }, ref) => {
  const isMe = props.children === '@Michael'
  return (
    <Box
      component="span"
      sx={{
        borderRadius: '3px',
        color: isMe ? '#2E629E' : '#2F629F',
        cursor: 'pointer',
        background: isMe ? '#F3E5BA' : '#E7EFF4',
        padding: '2px 3px',
        '&:hover': {
          color: isMe ? '#214B87' : '#01247C',
          backgroundColor: isMe ? '#F2E5BA' : '#D5E5EF',
        },
      }}
      ref={ref}
      {...props}
    />
  )
})
