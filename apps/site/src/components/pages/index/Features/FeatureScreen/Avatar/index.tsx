import MuiAvatar from '@mui/material/Avatar'
import { SkeletonBox } from '../../../../../Skeleton'

import AngelaUrl from './images/Angela.png'
import MichaelUrl from './images/Michael.png'

export type User = 'Angela' | 'Michael'

export function Avatar({ user }: { user: User }) {
  return (
    <SkeletonBox
      on="dark"
      sx={{
        borderRadius: '2px',
        height: '12px',
        width: '12px',
      }}
    />
  )
}
