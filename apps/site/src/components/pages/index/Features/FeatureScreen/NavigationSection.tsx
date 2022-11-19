import { Skeleton, SkeletonBox } from '../../../../Skeleton'

import { SkeletonWidthProvider } from '../../../../../contexts/SkeletonWidth'

import Box from '@mui/material/Box'

export function NavigationSection({
  appsSelected = false,
  channelCount,
  headed = true,
  apps = false,
  seed = apps ? 'apps' : undefined,
}: {
  appsSelected?: boolean
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
              height: '5px',
              opacity: '0.5',
              ...(apps ? { width: '15px' } : {}),
              marginBottom: '0px',
            }}
          />
        )}
        {new Array(channelCount).fill(undefined).map((_, index) => {
          if (apps && appsSelected && index === 0) {
            return (
              <Box
                key={index}
                sx={{
                  margin: '2px -7px -2px',
                  padding: '2px 7px',
                  display: 'flex',
                  background: '#2E629E',
                }}
              >
                <SkeletonBox
                  sx={{
                    height: '6px',
                    width: '6px',
                    margin: '-0.5px 4px -0.5px 0',
                    background: 'white',
                    opacity: 0.8,
                    borderRadius: '1px',
                  }}
                />
                <SkeletonBox
                  sx={{
                    width: '30px',
                    height: '5px',
                    margin: 0,
                    background: 'white',
                    opacity: 0.8,
                  }}
                  on="dark"
                />
              </Box>
            )
          }
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                height: '10px',
              }}
            >
              {apps && (
                <SkeletonBox
                  sx={{
                    background: 'white',
                    height: '6.5px',
                    width: '6.5px',
                    flexShrink: 0,
                    margin: '4.5px 4px 0 0',
                    opacity: 0.3,
                    borderRadius: '1px',
                  }}
                />
              )}
              <Skeleton
                on="dark"
                sx={{
                  height: '5px',
                  opacity: '0.3',
                  ...(apps && index === 0 ? { width: '30px' } : {}),
                }}
              />
            </Box>
          )
        })}
      </Box>
    </SkeletonWidthProvider>
  )
}
