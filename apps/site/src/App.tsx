import { ReactNode } from 'react'
import { SkeletonWidthProvider } from './contexts/SkeletonWidth'

import { ThemeProvider } from './Theme'

type AppProps = {
  children: ReactNode
}
export function App({ children }: AppProps) {
  return (
    <ThemeProvider>
      <SkeletonWidthProvider>{children}</SkeletonWidthProvider>
    </ThemeProvider>
  )
}
