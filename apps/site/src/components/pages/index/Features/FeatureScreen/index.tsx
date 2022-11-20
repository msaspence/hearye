import Box from '@mui/material/Box'
import { ReactNode } from 'react'

import { WindowControl } from './WindowControl'
import { SearchBar } from './SearchBar'
import { Avatar, User } from './Avatar'
import { NavigationSection } from './NavigationSection'
import { SkeletonWidthProvider } from '../../../../../contexts/SkeletonWidth'
import { SkeletonBox } from '../../../../Skeleton'
import { SkeletonMessage } from './SkeletonMessage'
import { ChannelBar } from './ChannelBar'

export { SkeletonHearYeMessage } from './SkeletonHearYeMessage'

const SECTIONS: Record<User, number[]> = {
  Angela: [5, 6],
  Michael: [3, 5, 4],
}

export function FeatureScreen({
  children,
  hearYeSelected = false,
  huddle = !hearYeSelected,
  side = 'right',
  user = 'Angela',
  messageCount = 2,
  seed = user,
}: {
  hearYeSelected?: boolean
  children?: ReactNode
  huddle?: boolean
  messageCount?: number
  seed?: string
  side?: 'right' | 'left'
  user?: User
}) {
  return (
    <SkeletonWidthProvider seed={seed}>
      <Box
        sx={{
          minWidth: '450px',
          [side == 'right' ? 'marginRight' : 'marginLeft']: '-100px',
          padding: '10px',
        }}
      >
        <Box
          sx={{
            boxShadow: '0px 0px 5px rgba(0,0,0,0.5)',
            borderRadius: '5px',
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              background: '#270B29',
              display: 'flex',
              paddingX: '5px',
              height: '20px',
            }}
          >
            <WindowControl role="close" />
            <WindowControl role="min" />
            <WindowControl role="max" />
            <Box sx={{ flexGrow: 1 }}>
              <SearchBar sx={{ margin: '0 auto' }} />
            </Box>
            <Avatar />
          </Box>
          <Box sx={{ flexGrow: 1, alignItems: 'stretch', display: 'flex' }}>
            <Box
              sx={{
                background: '#38133D',
                display: 'flex',
                flexDirection: 'column',
                width: '20%',
              }}
            >
              <Box
                sx={{
                  borderTop: '1px solid rgba(254, 254, 254, 0.2)',
                  borderBottom: '1px solid rgba(254, 254, 254, 0.2)',
                  display: 'flex',
                  padding: '7px',
                }}
              >
                <SkeletonBox
                  on="dark"
                  sx={{
                    borderRadius: '6px',
                    height: '5px',
                    opacity: '0.5',
                    margin: 0,
                    width: '40%',
                  }}
                />
                <Box sx={{ flexGrow: 1 }} />
                <SkeletonBox
                  on="dark"
                  sx={{
                    borderRadius: '10px',
                    height: '10px',
                    opacity: '0.5',
                    margin: '-3px 0',
                    width: '10px',
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  maxHeight: '219px',
                  overflow: 'hidden',
                  justifyContent: hearYeSelected ? 'flex-end' : 'flex-start',
                  paddingBottom: '10px',
                }}
              >
                {SECTIONS[user].map((channelCount, index) => {
                  return (
                    <NavigationSection
                      channelSelected={index === 1 && !hearYeSelected}
                      channelCount={channelCount}
                      headed={index !== 0}
                      key={index}
                    />
                  )
                })}
                <NavigationSection
                  hearYeSelected={hearYeSelected}
                  apps
                  channelCount={2}
                  headed
                />
                <Box sx={{ flexGrow: 1 }} />
              </Box>
              {huddle && (
                <Box
                  sx={{
                    borderTop: '1px solid rgba(254, 254, 254, 0.2)',
                    padding: '0 5px',
                  }}
                >
                  <SkeletonBox
                    on="dark"
                    sx={{
                      height: '4px',
                      opacity: '0.3',
                      width: '60%',
                    }}
                  />
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'column',
                flexShrink: 0,
                flexGrow: 1,
                maxHeight: '240px',
                overflow: 'hidden',
              }}
            >
              <ChannelBar app={hearYeSelected} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  overflow: 'hidden',
                  padding: '7px',
                  flexGrow: 1,
                }}
              >
                {children
                  ? children
                  : new Array(messageCount).fill(undefined).map((_, index) => {
                      return <SkeletonMessage key={index} />
                    })}
              </Box>
              <Box
                sx={{
                  border: '1px solid #C8C8C8',
                  borderRadius: '2px',
                  height: '35px',
                  position: 'relative',
                  overflow: 'hidden',
                  flexShrink: 0,
                  margin: '0 7px 7px',
                }}
              >
                <Box
                  sx={{
                    height: '10px',
                    left: '0',
                    top: '0',
                    right: '0',
                    background: '#F8F8F8',
                  }}
                />
                <Box
                  sx={{
                    backgroundColor: '#34785C',
                    borderRadius: '2px',
                    height: '10px',
                    width: '15px',
                    bottom: '3px',
                    right: '3px',
                    position: 'absolute',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </SkeletonWidthProvider>
  )
}
