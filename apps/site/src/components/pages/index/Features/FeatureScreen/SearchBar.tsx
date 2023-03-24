import type { CSSProperties } from '@mui/styled-engine'
import { SkeletonBox } from '../../../../Skeleton'

export function SearchBar({ sx }: { sx: CSSProperties }) {
  return (
    <SkeletonBox
      sx={{ width: '200px', height: '10px', opacity: '0.3', ...sx }}
      on="dark"
    />
  )
}
