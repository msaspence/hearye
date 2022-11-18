import Box from '@mui/material/Box'
import { ReactNode } from 'react'

import { WindowControl } from './WindowControl'
import { SearchBar } from './SearchBar'
import { Avatar, User } from './Avatar'
import { Skeleton } from '../../../../../components/Skeleton'

export function FeatureScreen({
  children,
  side = 'right',
  user = 'Angela',
  sections = [5, 7],
}: {
  children: ReactNode
  sections?: number[]
  side?: 'right' | 'left'
  user?: User
}) {
  return (
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
            {sections.map((channelCount, sectionIndex) => {
              return (
                <Box
                  sx={{
                    padding: sectionIndex === 0 ? '7px' : '7px 7px 0',
                    borderBottom:
                      sectionIndex === 0
                        ? '1px solid rgba(254, 254, 254, 0.2)'
                        : 'none',
                  }}
                >
                  {new Array(channelCount)
                    .fill(undefined)
                    .map((_, channelIndex) => {
                      return (
                        <Skeleton
                          on="dark"
                          sx={{
                            height: '5px',
                            opacity:
                              channelIndex === 0 && sectionIndex !== 0
                                ? '0.5'
                                : '0.3',
                          }}
                        />
                      )
                    })}
                </Box>
              )
            })}
          </Box>
          <Box sx={{ flexGrow: 1, padding: '10px' }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  )
}
