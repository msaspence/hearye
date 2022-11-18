import { CSSProperties } from '@mui/styled-engine'

import { useSkeletonWidth } from '../../contexts/SkeletonWidth'
import { SkeletonBox } from './SkeletonBox'
export * from './SkeletonBox'

type On = 'light' | 'dark'
export function Skeleton({
  sx = {},
  on = 'light',
}: {
  on?: On
  sx?: CSSProperties
}) {
  const width = useSkeletonWidth()
  return (
    <SkeletonBox
      sx={{
        width,
        ...sx,
      }}
      on={on}
    />
  )
}
