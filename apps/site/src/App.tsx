import { ReactNode } from 'react'
import { SkeletonWidthProvider } from './contexts/SkeletonWidth'
import { MixPanelProvider } from './contexts/MixPanel'
import { ThemeProvider } from './Theme'

type AppProps = {
  children: ReactNode
}
export function App({ children }: AppProps) {
  return (
    <ThemeProvider>
      <MixPanelProvider>
        <SkeletonWidthProvider>{children}</SkeletonWidthProvider>
      </MixPanelProvider>
    </ThemeProvider>
  )
}
