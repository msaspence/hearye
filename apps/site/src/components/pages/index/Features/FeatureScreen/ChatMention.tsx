import Box from '@mui/material/Box'
import { ReactNode, forwardRef } from 'react'
import Link from '@mui/material/Link'

export const ChatMention = forwardRef(
  (
    rawProps: { href?: string; children: ReactNode; isInArchivo?: boolean },
    ref
  ) => {
    const { isInArchivo, ...props } = rawProps
    const isMe = props.children === '@Michael'
    const content = (
      <Box
        component="span"
        sx={{
          borderRadius: '3px',
          color: isMe ? '#2E629E' : '#2F629F',
          cursor: 'pointer',
          background: isMe ? '#F3E5BA' : '#E7EFF4',
          fontFamily: 'Lato, sans-serif',
          fontWeight: 'normal',
          fontSize: isInArchivo ? '0.8em' : undefined,
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
    return props.href ? (
      <Link href={props.href} target="_blank">
        {content}
      </Link>
    ) : (
      content
    )
  }
)
