import { Skeleton } from '../../../../Skeleton'

import Box from '@mui/material/Box'

export function NavigationSection({
  channelCount,
  headed = true,
}: {
  channelCount: number
  headed: boolean
}) {
  return (
    <Box
      sx={{
        padding: headed ? '3px 7px 0' : '7px',
        borderBottom: headed ? 'none' : '1px solid rgba(254, 254, 254, 0.2)',
      }}
    >
      {headed && (
        <Skeleton
          on="dark"
          sx={{
            height: '5px',
            opacity: '0.5',
          }}
        />
      )}
      {new Array(channelCount).fill(undefined).map((_, index) => {
        return (
          <Skeleton
            on="dark"
            key={index}
            sx={{
              height: '5px',
              opacity: '0.3',
            }}
          />
        )
      })}
    </Box>
  )
}
