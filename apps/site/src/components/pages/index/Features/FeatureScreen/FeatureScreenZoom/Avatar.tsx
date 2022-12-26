import MuiAvatar from '@mui/material/Avatar'

import PamUrl from './images/Pam.png'
import IconUrl from '../../../../../../../images/icon.png'

export type User = 'Pam' | 'Hear Ye!'

export function Avatar({ user }: { user: User }) {
  return (
    <MuiAvatar
      sx={{
        borderRadius: '5px',
        height: '36px',
        width: '36px',
        marginRight: '8px',
      }}
      src={URLS[user]}
    />
  )
}

const URLS: Record<User, string> = {
  Pam: PamUrl,
  'Hear Ye!': IconUrl,
}
