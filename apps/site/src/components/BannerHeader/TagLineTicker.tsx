import Box from '@mui/material/Box'
import { useCallback, useState, useMemo } from 'react'

import { TagLineTickerItem } from './TagLineTickerItem'

export function TagLineTicker() {
  const { next, current, doNext } = useTickerState()
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      {next && (
        <TagLineTickerItem key={next} onEnd={doNext}>
          {next}
        </TagLineTickerItem>
      )}

      {current && (
        <TagLineTickerItem key={current} onEnd={doNext} startIn={!next}>
          {current}
        </TagLineTickerItem>
      )}
    </Box>
  )
}

const ADJECTIVES = ['Urgent', 'Critical', 'Important', 'Crucial', 'Vital']
const NOUNS = ['Announcement', 'Message', 'Update', 'Request']

function useTickerState() {
  const {
    current: currentAdjective,
    next: nextAdjective,
    doNext: doNextAdjective,
  } = useTickerStateForWordClass(ADJECTIVES)
  const {
    current: currentNoun,
    next: nextNoun,
    doNext: doNextNoun,
  } = useTickerStateForWordClass(NOUNS)
  return {
    current: `${currentAdjective} ${currentNoun}`,
    next: nextAdjective && `${nextAdjective} ${nextNoun}`,
    doNext: useCallback(() => {
      doNextAdjective()
      doNextNoun()
    }, [doNextAdjective, doNextNoun]),
  }
}

function useTickerStateForWordClass(array: string[]) {
  const [state, setState] = useState<string[]>([])
  const doNext = useCallback(() => {
    setState((currentState) => {
      const newState = currentState.length === 0 ? array : [...currentState]
      const popped = newState.shift()
      if (popped) newState.push(popped)
      return newState
    })
  }, [setState])
  return useMemo(
    () => ({
      current: state[0] || array[1],
      next: state[1] || null,
      doNext,
    }),
    [state, doNext]
  )
}
