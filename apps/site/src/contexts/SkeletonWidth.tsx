import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Prando from 'prando'

export function usePrando(min: number, max: number) {
  const { next, reset } = useContext(SkeletonWidthContext)
  useEffect(reset, [])
  return next(min, max)
}

export function useSkeletonWidth(min = 0.4, max = 1) {
  const prandoValue = usePrando(min, max)
  return useMemo(() => {
    const width = Math.round(prandoValue * 100)
    return `${width}%`
  }, [prandoValue])
}

const SkeletonWidthContext = createContext<{
  next: (min?: number | undefined, max?: number | undefined) => number
  reset: () => void
}>({
  next: () => {
    return 0
  },
  reset: () => {
    return
  },
})

export function SkeletonWidthProvider({
  children,
  seed,
}: {
  children: ReactNode
  seed?: string | number
}) {
  const [prando, setPrando] = useState(new Prando(seed || 'global'))
  const reset = useCallback(() => setPrando(new Prando(seed || 'global')), [])
  const value = useMemo(
    () => ({
      reset,
      next: (min?: number | undefined, max?: number | undefined) =>
        prando.next(min, max),
    }),
    [reset, prando]
  )
  return (
    <SkeletonWidthContext.Provider value={value}>
      {children}
    </SkeletonWidthContext.Provider>
  )
}
