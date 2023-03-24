import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import type { CSSProperties } from '@mui/styled-engine'

import { usePrando } from '../../../../../contexts/SkeletonWidth'
import { Skeleton, SkeletonBox } from '../../../../Skeleton'

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
    <Box sx={{ display: 'flex', marginBottom: '5px', ...sx }}>
      {!nested && (
        <SkeletonBox
          sx={{ width: '11px', height: '11px', marginRight: '5px' }}
        />
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex' }}>
          {nested && (
            <SkeletonBox
              sx={{
                width: '5px',
                borderRadius: '1px',
                height: '5px',
                marginTop: '4.5px',
                marginRight: '3px',
                marginBottom: '3px',
              }}
            />
          )}
          <Skeleton
            sx={{ height: '4px', opacity: 0.5, marginBottom: '3px' }}
            max={0.4}
            min={0.2}
          />
        </Box>
        {new Array(lines).fill(undefined).map((_, index) => {
          return (
            <Skeleton
              key={index}
              sx={{ height: '4px', marginBottom: '3px', marginTop: 0 }}
              min={index !== lines - 1 ? 0.9 : 0.4}
            />
          )
        })}
        {children}
      </Box>
    </Box>
  )
}
