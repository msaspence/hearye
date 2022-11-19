import Box from '@mui/material/Box'
import { Skeleton, SkeletonBox } from '../../../../Skeleton'

export function NavigationItem({
  icon = false,
  selected = false,
  maxWidth = 1,
  width = undefined,
}: {
  icon?: boolean
  selected?: boolean
  maxWidth?: number
  width?: string | undefined
}) {
  return (
    <Box
      sx={{
        margin: '2px -7px -2px',
        padding: '2px 7px',
        display: 'flex',
        background: selected ? '#2E629E' : 'none',
      }}
    >
      {icon && (
        <SkeletonBox
          sx={{
            height: '5px',
            width: '5px',
            margin: '-0.5px 3px -0.5px 0',
            background: 'white',
            opacity: selected ? 0.8 : 0.3,
            borderRadius: '1px',
            flexShrink: 0,
          }}
        />
      )}
      <Skeleton
        sx={{
          height: '4px',
          margin: 0,
          background: 'white',
          opacity: selected ? 0.8 : 0.3,
          ...(width ? { width } : {}),
        }}
        max={maxWidth}
        on="dark"
      />
    </Box>
  )
}
