import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import sample from 'lodash/sample'
import without from 'lodash/without'
import { useCallback, useEffect, useRef, useState } from 'react'

import { AddToSlackButton } from './AddToSlackButton'
import logoUrl from '../../images/logo.png'

export function BannerHeader() {
  const { next, previous, state } = useDontMiss()
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ display: 'none' }} variant="h1">
          Hear Ye!
        </Typography>
        <Box
          component="img"
          id="logo"
          src={logoUrl}
          sx={{
            marginRight: '50px',
            width: '200px',
          }}
          alt="Hear Ye!"
        />
      </Box>
      <Box
        sx={{
          textAlign: 'right',
          marginTop: '20px',
          width: '550px',
        }}
      >
        <Typography sx={{ marginBottom: '20px' }} variant="h2">
          Don't Miss Another!
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <Flipper next={next} previous={previous} state={state} />{' '}
            <Box sx={{ marginLeft: '10px' }}>Again</Box>
          </Box>
        </Typography>
        <AddToSlackButton />
      </Box>
    </Box>
  )
}

function useDontMiss() {
  const {
    value: adjective,
    previous: previousAdjective,
    doNext: doNextAdjective,
  } = useRandomValue(ADJECTIVES)
  const {
    value: noun,
    previous: previousNoun,
    doNext: doNextNoun,
  } = useRandomValue(NOUNS)

  const [state, setState] = useState(false)
  const stateRef = useRef<NodeJS.Timer | null>()
  const switchState = () => {
    setState((currentValue) => {
      if (currentValue) return false
      doNextAdjective()
      doNextNoun()
      return true
    })
  }

  useEffect(() => {
    stateRef.current = setTimeout(switchState, state ? TWO_SECONDS : 0)
    return () => {
      if (stateRef.current) clearTimeout(stateRef.current)
    }
  }, [state])
  return {
    previous: `${previousAdjective} ${previousNoun}`,
    next: `${adjective} ${noun}`,
    state,
  }
}

function useRandomValue(values: string[]) {
  const [value, setValue] = useState(values[1])
  const [previous, setPrevious] = useState<null | string>(values[0])
  const doNext = useCallback(
    () =>
      setValue((currentValue) => {
        setPrevious(currentValue)
        return sample(without(values, currentValue)) as string
      }),
    [setValue, values]
  )
  return { value, previous, doNext }
}

const TWO_SECONDS = 2000
const ADJECTIVES = ['Critical', 'Urgent', 'Important', 'Crucial', 'Vital']
const NOUNS = ['Message', 'Announcement', 'Update', 'Request']

function Flipper({
  next,
  previous,
  state,
}: {
  next: string
  previous: string
  state: boolean
}) {
  return (
    <Box sx={{ display: 'inline-block', maxHeight: '1em', overflow: '' }}>
      <Box
        sx={{
          display: 'inline-block',
          position: 'relative',
        }}
        style={{
          transition: state
            ? 'all 0.5s cubic-bezier(0.76, 0, 0.24, 1)'
            : 'none',
          top: state ? '-0.5em' : '0',
          opacity: state ? '0' : '1',
        }}
      >
        {previous}
      </Box>
      <Box
        sx={{
          display: 'inline-block',
          position: 'relative',
          marginTop: '-0.5em',
        }}
        style={{
          top: state ? '-1em' : '-0.5em',
          opacity: state ? '1' : '0',
          transition: state
            ? 'all 0.5s cubic-bezier(0.76, 0, 0.24, 1) 0.1s'
            : 'none',
        }}
      >
        {next}
      </Box>
    </Box>
  )
}
