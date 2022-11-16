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

export function useSkeletonWidth() {
  const { next, reset } = useContext(SkeletonWidthContext)
  useEffect(reset, [])
  return useMemo(() => {
    const value = Math.round(next(0.4, 1) * 100)
    return `${value}%`
  }, [next])
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
  seed = 'global',
}: {
  children: ReactNode
  seed?: string | number
}) {
  const [prando, setPrando] = useState(new Prando(seed))
  const reset = useCallback(() => setPrando(new Prando(seed)), [])
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // if (import.meta.hot) {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   import.meta.hot.on('vite:beforeUpdate', () => {
  //     setPrando(new Prando(seed))
  //     value.reset()
  //   })
  // }
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
