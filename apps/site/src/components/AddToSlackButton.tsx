import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { SxProps, Theme } from '@mui/material/styles'
import slackLogoUrl from '../../images/slack-logo.svg'

export function AddToSlackButton({
  sx = {},
  variant,
}: {
  sx?: SxProps<Theme>
  variant?: 'large'
}) {
  const [apiHost, setApiHost] = useState('api.hearyebot.com')
  useEffect(() => {
    setApiHost(
      typeof window !== 'undefined' && window.location.host.match(/^localhost/)
        ? 'hearye.loophole.site'
        : 'api.hearyebot.com'
    )
  }, [])
  return (
    <Button
      href={`https://${apiHost}/slack/install`}
      sx={{
        alignItems: 'center',
        color: '#fff',
        backgroundColor: '#4A154B',
        border: 'none',
        borderRadius: '4px',
        display: 'inline-flex',
        fontFamily: 'Lato, sans-serif',
        fontSize: '18px',
        fontWeight: '600',
        justifyContent: 'center',
        textDecoration: 'none',
        padding: '10px 20px',
        textTransform: 'none',

        '&:hover': {
          backgroundColor: ' #742174',
          color: '#fff',
        },

        ...(variant
          ? {
              borderRadius: ' 8px;',
              fontSize: '30px',
              padding: '15px 30px',
            }
          : {}),
        ...sx,
      }}
    >
      <Box
        component="img"
        src={slackLogoUrl}
        sx={
          variant === 'large'
            ? { height: '36px', marginRight: ' 20px' }
            : { height: '18px', marginRight: ' 10px' }
        }
      />
      Add to Slack
    </Button>
  )
}
