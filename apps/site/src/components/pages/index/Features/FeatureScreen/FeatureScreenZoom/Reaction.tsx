import Box from '@mui/material/Box'
import { ReactNode, forwardRef } from 'react'

export const Reaction = forwardRef(
  (
    {
      self = false,
      children,
      ...props
    }: {
      self?: boolean
      children: ReactNode
    },
    ref
  ) => {
    return (
      <Box
        component="span"
        sx={{
          display: 'inline-flex',
          borderRadius: '20px',
          fontSize: '16px',
          alignItems: 'center',
          padding: self ? '2px 4px' : '3px 5px',
          background: self ? '#EAF5F9' : '#F6F6F6',
          border: `${self ? '1.5px' : '1px'} solid ${
            self ? '#4A99CC' : '#F6F6F6'
          }`,
          cursor: 'pointer',
          color: self ? '#2E629E' : 'inherit',
          marginRight: '5px',
          '&:hover': {
            border: `${self ? '1.5px' : '1px'} solid ${
              self ? '#4A99CC' : '#8E8E8E'
            }`,
            background: self ? '#EAF5F9' : 'white',
          },
        }}
        ref={ref}
        {...props}
      >
        <Box
          component="span"
          sx={{
            lineHeight: '16px',
            fontSize: '12px',
          }}
        >
          {children}
        </Box>{' '}
        <Box
          component="span"
          sx={{
            fontSize: '11px',
            lineHeight: '11px',
            marginLeft: '4px',
          }}
        >
          1
        </Box>
      </Box>
    )
  }
)
