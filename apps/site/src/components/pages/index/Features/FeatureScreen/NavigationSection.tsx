import Box from '@mui/material/Box'

import { Skeleton, SkeletonBox } from '../../../../Skeleton'
import { SkeletonWidthProvider } from '../../../../../contexts/SkeletonWidth'
import { NavigationItem } from './NavigationItem'

export function NavigationSection({
  hearYeSelected = false,
  channelSelected = false,
  channelCount,
  headed = true,
  apps = false,
  seed = apps ? 'apps' : undefined,
}: {
  channelSelected?: boolean
  hearYeSelected?: boolean
  channelCount: number
  headed: boolean
  apps?: boolean
  seed?: string
}) {
  return (
    <SkeletonWidthProvider seed={seed}>
      <Box
        sx={{
          marginBottom: headed ? '5px' : 0,
          padding: headed ? '3px 7px 0' : '7px',
          borderBottom: headed ? 'none' : '1px solid rgba(254, 254, 254, 0.2)',
        }}
      >
        {headed && (
          <Skeleton
            on="dark"
            sx={{
              height: '4px',
              opacity: '0.5',
              ...(apps ? { width: '15px' } : {}),
              marginBottom: '0px',
            }}
            max={0.6}
          />
        )}
        {new Array(channelCount).fill(undefined).map((_, index) => {
          return (
            <NavigationItem
              key={index}
              icon={apps || !headed}
              width={
                apps && index === 0
                  ? '20px'
                  : index === 1 && channelSelected
                  ? '45px'
                  : undefined
              }
              maxWidth={!headed ? 0.55 : 1}
              selected={
                (hearYeSelected && apps && index == 0) ||
                (index === 1 && channelSelected)
              }
            />
          )
        })}
      </Box>
    </SkeletonWidthProvider>
  )
}
