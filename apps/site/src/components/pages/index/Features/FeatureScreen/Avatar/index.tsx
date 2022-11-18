import MuiAvatar from '@mui/material/Avatar'

import AngelaUrl from './images/Angela.png'
import MichaelUrl from './images/Michael.png'

export type User = 'Angela' | 'Michael'

export function Avatar({ user }: { user: User }) {
  return (
    <MuiAvatar
      alt={user}
      src={URLS[user]}
      sx={{
        borderRadius: '2px',
        filter: 'brightness(140%)',
        fontSize: '10px',
        height: '12px',
        width: '12px',
      }}
    />
  )
}

const URLS: Record<User, string> = {
  Angela: AngelaUrl,
  Michael: MichaelUrl,
}
