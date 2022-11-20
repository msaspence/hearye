import Box from '@mui/material/Box'
import { SkeletonBox } from '../../../../Skeleton'
import { SkeletonMessage } from './SkeletonMessage'

export function SkeletonHearYeMessage() {
  return (
    <SkeletonMessage lines={2}>
      <SkeletonBox
        sx={{ border: '1px solid #888', background: 'none', width: '25px' }}
      />
      <Box
        sx={{ borderLeft: '2px solid #DDDDDD', padding: '0px 0 1.5px 5px ' }}
      >
        <SkeletonMessage nested sx={{ marginBottom: 0 }} />
      </Box>
    </SkeletonMessage>
  )
}
