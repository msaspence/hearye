import { CSSProperties } from '@mui/styled-engine'

import { useSkeletonWidth } from '../../contexts/SkeletonWidth'
import { SkeletonBox } from './SkeletonBox'
export * from './SkeletonBox'

type On = 'light' | 'dark'
export function Skeleton({
  sx = {},
  on = 'light',
  min = 0.4,
  max = 1,
}: {
  on?: On
  sx?: CSSProperties
  min?: number
  max?: number
}) {
  const width = useSkeletonWidth(min, max)
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
