import { CSSProperties } from '@mui/styled-engine'
import { SkeletonBox } from '../../../../Skeleton'

export function SearchBar({ sx }: { sx: CSSProperties }) {
  return (
    <SkeletonBox sx={{ width: '200px', height: '10px', ...sx }} on="dark" />
  )
}
