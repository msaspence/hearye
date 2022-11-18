import Box from '@mui/material/Box'
import { ReactNode } from 'react'

import { WindowControl } from './WindowControl'
import { SearchBar } from './SearchBar'
import { Avatar, User } from './Avatar'
import { NavigationSection } from './NavigationSection'
import { SkeletonWidthProvider } from '../../../../../contexts/SkeletonWidth'

const SECTIONS: Record<User, number[]> = {
  Angela: [5, 6],
  Michael: [3, 5, 4],
}
export function FeatureScreen({
  children,
  side = 'right',
  user = 'Angela',
  seed = user,
}: {
  children: ReactNode
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
            <Avatar user={user} />
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
              {SECTIONS[user].map((channelCount, index) => {
                return (
                  <NavigationSection
                    channelCount={channelCount}
                    headed={index !== 0}
                    key={index}
                  />
                )
              })}
            </Box>
            <Box sx={{ flexGrow: 1, padding: '10px' }}>{children}</Box>
          </Box>
        </Box>
      </Box>
    </SkeletonWidthProvider>
  )
}
