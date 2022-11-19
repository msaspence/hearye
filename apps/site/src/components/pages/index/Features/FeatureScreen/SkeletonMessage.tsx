import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { usePrando } from '../../../../../contexts/SkeletonWidth'
import { Skeleton, SkeletonBox } from '../../../../Skeleton'
import { CSSProperties } from '@mui/styled-engine'

export function SkeletonMessage({
  children,
  lines: linesProp,
  nested = false,
  sx = {},
}: {
  children?: ReactNode
  lines?: number
  nested?: boolean
  sx?: CSSProperties
}) {
  const lines = linesProp ? linesProp : Math.round(usePrando(1, 3))
  return (
    <Box sx={{ display: 'flex', marginBottom: '7px', ...sx }}>
      {!nested && (
        <SkeletonBox
          sx={{ width: '15px', height: '15px', marginRight: '5px' }}
        />
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex' }}>
          {nested && (
            <SkeletonBox
              sx={{
                width: '7px',
                height: '7px',
                marginTop: '4px',
                marginRight: '3px',
                marginBottom: '3px',
              }}
            />
          )}
          <Skeleton
            sx={{ height: '5px', opacity: 0.5, marginBottom: '3px' }}
            max={0.4}
            min={0.2}
          />
        </Box>
        {new Array(lines).fill(undefined).map((_, index) => {
          return (
            <Skeleton
              key={index}
              sx={{ height: '5px', marginBottom: '3px', marginTop: 0 }}
              min={index !== lines - 1 ? 0.9 : 0.4}
            />
          )
        })}
        {children}
      </Box>
    </Box>
  )
}
