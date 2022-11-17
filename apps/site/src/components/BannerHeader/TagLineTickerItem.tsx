import Typography from '@mui/material/Typography'
import { CSSProperties, useEffect, useRef, useState } from 'react'

export function TagLineTickerItem({
  children,
  onEnd,
  startIn = false,
}: {
  children: string
  onEnd?: () => void
  startIn?: boolean
}) {
  const [state, setState] = useState<FlipperItemStates>(
    startIn ? 'in' : 'start'
  )
  const timer = useRef<NodeJS.Timer | null>()
  useEffect(() => {
    timer.current = setTimeout(() => {
      setState((currentState) => {
        if (currentState === 'start') return 'in'
        if (currentState === 'in') {
          if (onEnd) onEnd()
          return 'out'
        }
        if (currentState === 'out') return 'end'
        return 'ended'
      })
    }, STATE_DURATIONS[state])
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [state, onEnd])

  return (
    <Typography
      sx={{
        height: 0,
        transition: 'all cubic-bezier(0.65, 0, 0.35, 1) 0.4s',
        right: 0,
      }}
      style={STYLES[state]}
      variant="h2"
    >
      {children}
    </Typography>
  )
}

type FlipperItemStates = 'start' | 'in' | 'out' | 'end' | 'ended'
const STYLES: Record<FlipperItemStates, CSSProperties> = {
  start: { transform: 'translateY(-0.5em)', opacity: 0 },
  in: { transform: 'translateY(0)', opacity: 1 },
  out: { transform: 'translateY(0.5em)', opacity: 0 },
  end: { transform: 'translateY(0.5em)', opacity: 0 },
  ended: { transform: 'translateY(0.5em)', opacity: 0 },
}
const STATE_DURATIONS = {
  start: 20,
  in: 2500,
  out: 300,
  end: 0,
  ended: 0,
}
