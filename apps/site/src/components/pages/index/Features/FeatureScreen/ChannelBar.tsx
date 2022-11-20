import Box from '@mui/material/Box'
import { SkeletonBox } from '../../../../Skeleton'

export function ChannelBar({ app = false }: { app: boolean }) {
  return (
    <>
      <Box
        sx={{
          borderBottom: '1px solid #C8C8C8',

          display: 'flex',
          padding: '7px',
        }}
      >
        {app && (
          <SkeletonBox
            sx={{
              height: '8px',
              width: '8px',
              margin: '-1px 4px -1px 0',
              opacity: '0.5',
              borderRadius: '1px',
              flexShrink: 0,
            }}
          />
        )}
        <SkeletonBox
          on="light"
          sx={{
            borderRadius: '6px',
            height: '6px',
            opacity: '0.5',
            margin: 0,
            width: app ? '35px' : '70px;',
          }}
        />
      </Box>
      <Box
        sx={{
          borderBottom: '1px solid #C8C8C8',

          display: 'flex',
          padding: '4px 7px',
        }}
      >
        <SkeletonBox
          on="light"
          sx={{
            borderRadius: '6px',
            height: '4px',
            opacity: '0.5',
            margin: 0,
            marginRight: '4px',
            width: app ? '20px' : '40px;',
          }}
        />
        {app && (
          <SkeletonBox
            on="light"
            sx={{
              borderRadius: '6px',
              height: '4px',
              opacity: '0.5',
              margin: 0,
              width: '15px',
            }}
          />
        )}
      </Box>
    </>
  )
}
